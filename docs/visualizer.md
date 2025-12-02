# Audio Visualizer (interactive)

This page contains a simple interactive audio visualizer that uses p5.js and p5.sound.

Instructions:
1. Upload a short MP3 file to `docs/assets/audio/sample.mp3` in the repository.
2. Reload this page.
3. Press the Play button below to start the audio and the visualizer.

Note: Browsers often require a user action (like clicking Play) to start audio.

<div id="visual-controls">
  <button id="play-btn">Play</button>
  <button id="stop-btn">Stop</button>
</div>

<div id="visual-area">
  <!-- p5.js will create a canvas here -->
</div>

<p>If you want to use a different audio file, update the path in docs/assets/js/visualizer.js or upload another file named sample.mp3 to `docs/assets/audio/`.</p>
