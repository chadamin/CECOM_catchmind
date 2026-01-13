from fastapi import FastAPI, UploadFile, File
import torch
import clip
from PIL import Image
import io

app = FastAPI()

@app.get("/")
def root():
    return {"status": "server alive"}


# 🔹 CLIP 모델은 서버 시작 시 1번만 로드
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)


@app.post("/clip-test")
async def clip_test(image: UploadFile = File(...)):
    # 이미지 로드
    image_bytes = await image.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image_input = preprocess(image).unsqueeze(0).to(device)

    # 🔹 CLIP이 비교할 단어들 (원하면 늘리거나 교체)
    candidates = [
        "cat",
        "dog",
        "car",
        "house",
        "tree",
        "person",
        "handwritten drawing"
    ]

    texts = [f"a drawing of a {c}" for c in candidates]
    text_tokens = clip.tokenize(texts).to(device)

    # CLIP 추론
    with torch.no_grad():
        image_features = model.encode_image(image_input)
        text_features = model.encode_text(text_tokens)
        similarity = (image_features @ text_features.T).softmax(dim=-1)[0]

    # 🔹 가장 유사한 단어 1개만 선택
    best_idx = similarity.argmax().item()
    best_word = candidates[best_idx]
    best_score = float(similarity[best_idx])

    # 🔹 웹에서 바로 쓰기 좋은 형태로 반환
    return {
        "guess": best_word,
        "confidence": round(best_score, 2)
    }
