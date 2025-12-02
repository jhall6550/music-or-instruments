// Simple p5.js + p5.sound visualizer
// Expects an audio file at docs/assets/audio/sample.mp3
// Make sure you uploaded sample.mp3 to docs/assets/audio/

let soundFile;
let fft;
let playing = false;

function preload() {
  // loadSound uses a path relative to the page. Keep the file at docs/assets/audio/sample.mp3
  // When the site is built, assets/audio/sample.mp3 will be served relative to the page.
  soundFile = loadSound('assets/audio/sample.mp3', () => {
    // loaded
  }, (err) => {
    console.warn('Could not load sample.mp3 — make sure it is uploaded to docs/assets/audio/sample.mp3', err);
  });
}

function setup() {
  // create and insert the canvas into the visual-area div
  const canvas = createCanvas(800, 300);
  canvas.parent('visual-area');
  noStroke();
  colorMode(HSB, 360, 255, 255);
  fft = new p5.FFT(0.8, 64);

  // Connect Play/Stop buttons
  const playBtn = document.getElementById('play-btn');
  const stopBtn = document.getElementById('stop-btn');

  if (playBtn) {
    playBtn.onclick = () => {
      if (soundFile && !soundFile.isPlaying()) {
        userStartAudio().then(() => {
          soundFile.loop();
          playing = true;
        });
      }
    };
  }
  if (stopBtn) {
    stopBtn.onclick = () => {
      if (soundFile && soundFile.isPlaying()) {
        soundFile.stop();
        playing = false;
      }
    };
  }
}

function draw() {
  background(20);
  if (!playing) {
    fill(180);
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Press Play to start the visualizer (and make sure sample.mp3 is uploaded)', width / 2, height / 2);
    return;
  }

  const spectrum = fft.analyze();
  const binWidth = width / spectrum.length;

  for (let i = 0; i < spectrum.length; i++) {
    const amp = spectrum[i];
    const y = map(amp, 0, 255, height, 0);
    const hue = map(i, 0, spectrum.length, 0, 360);
    fill((hue + frameCount) % 360, 200, 200);
    rect(i * binWidth, y, binWidth - 2, height - y);
  }
}

// Improve color mode once p5 is ready
function mousePressed() {
  // fallback to ensure audio context is resumed on click
  userStartAudio();
}
