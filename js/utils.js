export function initMdcSliders() {
  const sliders = [].map.call(
    document.querySelectorAll('.mdc-slider'),
    function (el) {
      const slider = new mdc.slider.MDCSlider(el);
      return slider;
    }
  );
  return sliders;
}

export function invertSite() {
  document.querySelector('html').style.filter = 'invert(100%) contrast(1.5)';
}

export function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]; // Eq 0.1, [1,0], [0,1]
}
