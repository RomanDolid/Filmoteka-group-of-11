import { Spinner } from 'spin.js';
import { refs } from './refs';

const opts = {
  lines: 20, // The number of lines to draw
  length: 40, // The length of each line
  width: 4, // The line thickness
  radius: 25, // The radius of the inner circle
  scale: 0.55, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1.2, // Rounds per second
  rotate: 29, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ff6b01', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '49%', // Top position relative to parent
  left: '49%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const spinner = new Spinner(opts).spin(refs.loader);

export default spinner;

// refs.loader.classList.add('is-hidden'); //скрыть спинер

// refs.loader.classList.remove('is-hidden'); //показать спинер
