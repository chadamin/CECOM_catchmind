let timeLeft = 20;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 20;
  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft === 0) {
      submitDrawing();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerUI() {
  const timer = document.getElementById("timer");
  timer.innerText = timeLeft;
}
