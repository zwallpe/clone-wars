(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function note(context, frequency, start, duration, volume, type) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type || 'triangle';
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        note(context, 392, start, 0.09, 0.12, 'triangle');
        note(context, 523.25, start + 0.065, 0.11, 0.1, 'triangle');
      } catch (error) {}
    },

    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        note(context, 523.25, start, 0.1, 0.12, 'square');
        note(context, 659.25, start + 0.075, 0.1, 0.12, 'square');
        note(context, 783.99, start + 0.15, 0.13, 0.1, 'triangle');
      } catch (error) {}
    },

    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        note(context, 220, start, 0.13, 0.14, 'sawtooth');
        note(context, 164.81, start + 0.09, 0.14, 0.12, 'sawtooth');
        note(context, 110, start + 0.18, 0.18, 0.1, 'triangle');
      } catch (error) {}
    }
  };
})();
