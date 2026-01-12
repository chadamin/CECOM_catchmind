const Game = {
  isPlaying: false,

  start() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    this.isPlaying = true;
    Canvas.clear();
    Timer.start();
  },

  submit() {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    Timer.stop();

    document.getElementById('result-screen').style.display = 'flex';

    // ✨ 아무것도 안 그린 경우
    if (!Canvas.hasDrawn) {
        document.getElementById('result-text').innerText = '그림 없음';
        document.getElementById('ai-thought').innerText =
        '아직 아무것도 그리지 않았어요 😅';
        return;
    }

    // ✨ 그린 게 있는 경우만 AI 분석
    document.getElementById('result-text').innerText = 'AI 분석 중...';

    AI.classify(Canvas.get(), this.showResult);
  },


  showResult(results) {
    const guess = results[0].label.replace(/_/g, ' ');
    document.getElementById('result-text').innerText = 'AI의 판단';
    document.getElementById('ai-thought').innerText =
      `혹시 "${guess}"을(를) 그렸나요?`;
  },

  reset() {
    if (!this.isPlaying) return;
    Canvas.clear();
  },

  restart() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
  }
};

// AI 모델은 페이지 로드 시 한 번만 초기화
window.onload = () => AI.init();
