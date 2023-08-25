class CompositeAudioNode extends GainNode {
  constructor(context, options) {
    super(context, options);
    this._output = new GainNode(context);
  }

  connect() {
    this._output.connect.apply(this._output, arguments);
  }

  disconnect() {
    this._output.disconnect.apply(this._output, arguments);
  }

  _connectInput() {
    return super.connect.apply(this, arguments);
  }
}

export default class CustomDelayNode extends CompositeAudioNode {
  constructor(context, options) {
    super(context, options);
    // Setup utility nodes
    this.inputNode = context.createGain();
    this.outputNode = context.createGain();
    this.delayNode = context.createDelay(5);
    this.feedbackNode = context.createGain();
    this.delayWetMixNode = context.createGain();
    this.delayDryMixNode = context.createGain();

    // Connect Inherited routes from CompostiteAudioNode
    this._connectInput(this.inputNode);
    this.outputNode.connect(this._output);

    // LFO
    this.lfoNode = context.createOscillator();
    this.lfoGainNode = context.createGain();
    this.lfoNode.frequency.value = 0.5; // Freq. in Hz
    this.lfoGainNode.gain.value = 0.0005;
    this.lfoNode.start();

    // Filter
    this.filterNode = context.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.value = 2000; // Freq. in Hz

    // Init Values
    this.feedbackNode.gain.value = 0.3;
    this.delayNode.delayTime.value = 0;
    this.delayDryMixNode.gain.value = 1;
    this.delayWetMixNode.gain.value = 0;

    // Connect LFO
    this.lfoNode.connect(this.lfoGainNode);
    this.lfoGainNode.connect(this.delayNode.delayTime); // modulate delaytime

    // Bypass Signal Route
    this.inputNode.connect(this.delayDryMixNode);
    this.delayDryMixNode.connect(this.outputNode);

    // Wet Route
    this.inputNode.connect(this.filterNode);
    this.filterNode.connect(this.delayNode);
    this.delayNode.connect(this.delayWetMixNode);
    this.delayNode.connect(this.feedbackNode);
    this.feedbackNode.connect(this.filterNode);
    this.delayWetMixNode.connect(this.outputNode);
  }

  set delayTime(val) {
    console.log(val);
    this.delayNode.delayTime.value = val;
  }

  get delayTime() {
    return this.delayNode.delayTime.value;
  }

  set feedback(val) {
    this.feedbackNode.gain.value = val;
  }

  get feedback() {
    return this.feedbackNode.gain.value;
  }

  set dryWet(val) {
    if (val >= 0 && val <= 1) {
      this.delayDryMixNode.gain.value = 1 - val;
      this.delayWetMixNode.gain.value = val;
    } else {
      throw "customDelayNode dryWet must be a value between 0 and 1";
    }
  }

  get dryWet() {
    return this.delayWetMixNode.gain.value;
  }
}
