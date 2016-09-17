import Sample from './modules/Sample';

(() => {
  const sample = new Sample({
    width: window.innerWidth,
    height: window.innerHeight,
    container: document.getElementById('canvas-container'),
  });
  sample.start();
  window.addEventListener('resize', () => sample.setSize(window.innerWidth, window.innerHeight));
})();
