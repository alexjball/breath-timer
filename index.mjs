class Segment {
  constructor({ name, audioElement, durationInput }) {
    this.name = name;
    this.audioElement = audioElement;
    this.durationInput = durationInput;
  }

  get duration() {
    return this.durationInput.value * 1000;
  }

  run(then) {
    if (this.duration === 0) {
      then();
      return;
    }

    this.audioElement.play();

    this.timeout = setTimeout(() => {
      this.reset();
      then();
    }, this.duration);
  }

  reset() {
    clearTimeout(this.timeout);
    this.audioElement.currentTime = 0;
    this.audioElement.pause();
  }
}

const segments = [
  new Segment({
    name: "Inhale",
    durationInput: document.getElementById("inhale-duration"),
    audioElement: document.getElementById("inhale"),
  }),
  new Segment({
    name: "Hold Top",
    durationInput: document.getElementById("hold-top-duration"),
    audioElement: document.getElementById("hold"),
  }),
  new Segment({
    name: "Exhale",
    durationInput: document.getElementById("exhale-duration"),
    audioElement: document.getElementById("exhale"),
  }),
  new Segment({
    name: "Hold Bottom",
    durationInput: document.getElementById("hold-bottom-duration"),
    audioElement: document.getElementById("hold"),
  }),
];

let currentSegment = null;
const runNextSegment = () => {
  segments[currentSegment].run(() => {
    currentSegment = (currentSegment + 1) % segments.length;
    runNextSegment();
  });
};

document.getElementById("playback").onclick = function () {
  if (currentSegment !== null) {
    segments[currentSegment].reset();
    currentSegment = null;
    this.textContent = "Play";
  } else {
    currentSegment = 0;
    this.textContent = "Pause";
    runNextSegment();
  }
};
