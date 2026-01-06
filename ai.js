let classifier;
let isGameOver = false;

function initAI() {
  console.log("AI 로딩 시작");
  classifier = ml5.imageClassifier('DoodleNet', () => {
    console.log("AI 로드 완료");
  });
}

function submitDrawing() {
  if (isGameOver) return;
  isGameOver = true;
  stopTimer();
  showLoading();

  classifier.classify(canvas.elt, (err, results) => {
    if (err) {
      console.error(err);
      showFallback();
      return;
    }
    showResult(results);
  });
}
