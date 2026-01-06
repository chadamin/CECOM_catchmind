let classifier;
let canvas;
let timeLeft = 20;
let timerInterval;
let isGameOver = false;
let isModelReady = false;

function setup() {
    // 1. 캔버스 생성 및 배치
    canvas = createCanvas(400, 400);
    canvas.parent('canvas-container');
    background(255); // 배경을 흰색으로 초기화

    // 2. AI 모델 로드
    console.log("모델 로딩 중...");
    classifier = ml5.imageClassifier('DoodleNet', () => {
        console.log("AI 모델 준비 완료!");
        isModelReady = true;
        // 모델이 준비되면 타이머 시작
        startTimer();
    });
}

function draw() {
    // 마우스 왼쪽 버튼이 눌려있고 게임 중일 때만 그리기
    if (mouseIsPressed && !isGameOver) {
        stroke(0);
        strokeWeight(12);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function startTimer() {
    // 혹시 실행 중인 타이머가 있다면 초기화
    if (timerInterval) clearInterval(timerInterval);
    
    timeLeft = 20;
    document.getElementById('timer').innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            submitDrawing();
        }
    }, 1000);
}

function submitDrawing() {
    if (isGameOver || !isModelReady) return;
    
    isGameOver = true;
    clearInterval(timerInterval);

    // AI 분석 수행
    classifier.classify(canvas, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        showResult(results);
    });
}

function showResult(results) {
    const resultScreen = document.getElementById('result-screen');
    const aiThought = document.getElementById('ai-thought');
    
    resultScreen.style.display = 'flex';
    
    // AI의 추측 결과 (영어 -> 한글 변환 로직을 넣으면 좋음)
    let guess = results[0].label.replace(/_/g, ' ');
    aiThought.innerText = `AI의 생각: \n"혹시 [ ${guess} ] (을)를 그리셨나요?"`;
}

function resetGame() {
    isGameOver = false;
    background(255);
    document.getElementById('result-screen').style.display = 'none';
    startTimer();
}

function closeResult() {
    resetGame();
}