import CustomAudioBufferSourceNode from '../../../../../../../../js/CustomAudioBufferSourceNode.js';

export function playBuffer(audioBuffer, audioContext, outputNode, playFrom = 0) {
  const audioBufferSrcNode = createCustomAudioBufferSrc(audioBuffer, audioContext);
  audioBufferSrcNode.connect(outputNode);
  audioBufferSrcNode.start(0, playFrom);
  return audioBufferSrcNode;
}

export async function fetchAudioBuffer(filePath, audioContext) {
  try {
    const response = await fetch(filePath); // Returns a response object
    const arrayBuffer = await response.arrayBuffer(); // Returns a raw byte array of the file
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer); // Decode the raw data into an AudioBuffer
    return audioBuffer; // Return the AudioBuffer
  } catch (error) {
    console.log(error);
  }
}

export function createAudioBufferSrc(audioBuffer, audioContext) {
  const audioBufferSourceNode = audioContext.createBufferSource(); // Create an empty AudioBufferSourceNode
  audioBufferSourceNode.buffer = audioBuffer; // Set the buffer in the new AudioBufferSourceNode to the decoded audio data
  return audioBufferSourceNode;
}

export function createCustomAudioBufferSrc(audioBuffer, audioContext) {
  const audioBufferSourceNode = new CustomAudioBufferSourceNode(audioContext); // Create an empty AudioBufferSourceNode
  audioBufferSourceNode.buffer = audioBuffer; // Set the buffer in the new AudioBufferSourceNode to the decoded audio data
  return audioBufferSourceNode;
}
