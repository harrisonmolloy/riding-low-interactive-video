export default function startFullScreenWaveform(audioNode, canvasElement, audioContext) {
  // init Canvas for analyser to draw to
  const canvasContext = initFullScreenCanvas(canvasElement);

  // Create and connect an analyser node
  const analyserNode = createAnalyserNode(audioContext);
  audioNode.connect(analyserNode);

  // Start drawing the waveform in the canvas
  drawWaveform(canvasContext, analyserNode);
}

function createAnalyserNode(audioContext, fft = 512) {
  const analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = fft;
  return analyserNode;
}

function initFullScreenCanvas(canvasElement) {
  const canvasContext = canvasElement.getContext('2d');

  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  window.onresize = () => {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
  };

  clearCanvas(canvasContext);
  return canvasContext;
}

function drawWaveform(canvasContext, analyserNode) {
  requestAnimationFrame(() => drawWaveform(canvasContext, analyserNode));
  clearCanvas(canvasContext);

  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = 'rgb(200, 200, 200)';

  const dataArray = getCurrentWaveformArray(analyserNode);
  const bufferLength = dataArray.length;
  const canvasElement = canvasContext.canvas;
  const sliceWidth = (canvasElement.width * 1.0) / bufferLength;

  canvasContext.beginPath();

  let x = 0;
  for (let i = 0; i <= bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * canvasElement.height) / 2;

    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }
    x += sliceWidth;
  }

  // canvasContext.lineTo(canvasElement.width, canvasElement.height / 2);
  canvasContext.stroke();
}

function getCurrentWaveformArray(analyserNode) {
  const bufferLength = analyserNode.frequencyBinCount; // an Int
  const dataArray = new Uint8Array(bufferLength);
  analyserNode.getByteTimeDomainData(dataArray);
  return dataArray;
}

function clearCanvas(canvasContext) {
  const canvasElt = canvasContext.canvas;
  canvasContext.clearRect(0, 0, canvasElt.width, canvasElt.height);
}
