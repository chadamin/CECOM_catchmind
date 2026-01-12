const AI = {
  model: null,

  init() {
    this.model = ml5.imageClassifier('DoodleNet', () => {
      console.log('AI 모델 준비 완료');
    });
  },

  classify(canvas, callback) {
    this.model.classify(canvas, (err, results) => {
      if (err) {
        alert('AI 분석 실패');
        return;
      }
      callback(results);
    });
  }
};
