import { playBuffer, fetchAudioBuffer } from "/js/playBuffer.js";
import { initMdcSliders, convertRange } from "/js/utils.js";
import startFullScreenWaveform from "/js/Analyser.js";
import CustomDelayNode from "/js/CustomDelayNode.js";

const videoEl = document.querySelector("#riding-low-video");
const playBtn = document.querySelector("#play-button");
const canvasEl = document.querySelector("canvas");
const [slider1, slider2] = initMdcSliders();

let playing = false;
let playbackPosition = 0;
let playbackRate = 1;
let trackDuration;
let neverPlayed = true;

let audioCtx;
let track;
let customDelayNode;

window.addEventListener("DOMContentLoaded", async () => {
  audioCtx = new AudioContext();
  customDelayNode = new CustomDelayNode(audioCtx);
  customDelayNode.connect(audioCtx.destination);

  startFullScreenWaveform(customDelayNode, canvasEl, audioCtx);

  const audioBuffer = await fetchAudioBuffer("/assets/ridinglow.mp3", audioCtx);
  trackDuration = audioBuffer.duration;

  playBtn.addEventListener("click", () => {
    if ((neverPlayed = true)) {
      audioCtx.resume();
      neverPlayed = !neverPlayed;
    }
    const playFrom = playbackPosition * trackDuration;
    toggleMdcPlayBtn(playBtn);
    if (playing === false) {
      track = playBuffer(audioBuffer, audioCtx, customDelayNode, playFrom);
      track.playbackRate.value = playbackRate;
      videoEl.playbackRate = playbackRate;
      videoEl.play();
      playing = true;
    } else {
      track.stop();
      videoEl.pause();
      playbackPosition = track.playbackPosition;
      playing = false;
    }
  });
});

slider2.root.addEventListener("MDCSlider:input", (event) => {
  if (track) {
    playbackRate = event.detail.value;
    track.playbackRate.value = playbackRate;
    videoEl.playbackRate = playbackRate;
  }
});

slider1.root.addEventListener("MDCSlider:change", (event) => {
  if (track) {
    customDelayNode.delayTime = convertRange(
      event.detail.value,
      [0, 1],
      [0, 5]
    );
    customDelayNode.dryWet = event.detail.value;
  }
});

function toggleMdcPlayBtn(mdcPlayBtn) {
  const mdcPlayBtnIcon = mdcPlayBtn.getElementsByClassName("mdc-fab__icon")[0];
  const state = mdcPlayBtn.getAttribute("data-playing") === "true";
  mdcPlayBtn.setAttribute("data-playing", state ? "false" : "true");
  mdcPlayBtnIcon.innerHTML = state ? "play_circle" : "pause_circle";
}
