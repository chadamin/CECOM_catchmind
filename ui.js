// 화면 전환 담당

function startGame() {
  // 시작 화면 숨기기
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-ui").style.display = "block";

  // 상태 초기화
  isGameOver = false;
  clearCanvas();

  // AI + 타이머 시작
  initAI();
  startTimer();
}

function showLoading() {
  const screen = document.getElementById("result-screen");
  document.getElementById("result-text").innerText = "AI 분석 중...";
  document.getElementById("ai-thought").innerText = "잠시만 기다려 주세요 🤖";
  screen.style.display = "flex";
}

function showFallback() {
  document.getElementById("result-text").innerText = "AI 분석 실패 😢";
  document.getElementById("ai-thought").innerText =
    "모델 또는 네트워크 문제로 분석하지 못했어요.";
}

function resetGame() {
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("game-ui").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}
