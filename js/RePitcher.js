function setBSNRate(audioBufferSourceNode, rate) {
  audioBufferSourceNode.paybackRate.value = rate;
  console.log('Rate set to' + rate);
}
