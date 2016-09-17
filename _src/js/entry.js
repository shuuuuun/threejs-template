import Sample from './modules/Sample';

(() => {
  const sample = new Sample({
    container: document.getElementById('canvas-container'),
  });
  sample.start();
})();
