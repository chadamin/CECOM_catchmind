const Timer = {
  time: 20,
  interval: null,

  start() {
    this.stop();
    this.time = 20;
    document.getElementById('timer').innerText = this.time;

    this.interval = setInterval(() => {
      this.time--;
      document.getElementById('timer').innerText = this.time;

      if (this.time <= 0) {
        Game.submit();
      }
    }, 1000);
  },

  stop() {
    if (this.interval) clearInterval(this.interval);
  },

  reset() {
    this.stop();
    this.time = 20;
    document.getElementById('timer').innerText = this.time;
  }
};
