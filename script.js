document.addEventListener('DOMContentLoaded', () => {
  const revealBtn = document.getElementById('revealBtn');
  const submitBtn = document.getElementById('submitBtn');
  const guessInput = document.getElementById('guessInput');
  const feedback = document.getElementById('feedback');
  const scoreDisplay = document.getElementById('score-display');
  const canvas = document.getElementById('celebrityCanvas');
  const ctx = canvas.getContext('2d');

  const answer = "zendaya"; // Celebrity name in lowercase, change as needed
  let score = 100;
  const maxPixelation = 20;
  let currentPixelation = maxPixelation;

  const img = new Image();
  img.src = 'celebrity.jpg';

  img.onload = () => {
    drawPixelated(currentPixelation);
  };

  function drawPixelated(pixelSize) {
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;

    // Draw the pixelated image by scaling down and back up
    ctx.drawImage(img, 0, 0, width / pixelSize, height / pixelSize);
    ctx.drawImage(canvas, 0, 0, width / pixelSize, height / pixelSize, 0, 0, width, height);
  }

  function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
  }

  revealBtn.addEventListener('click', () => {
    if (currentPixelation > 0) {
      currentPixelation -= 4;
      if (currentPixelation < 1) currentPixelation = 1; // Prevent divide by zero
      score = Math.max(0, score - 20);
      updateScore();
      drawPixelated(currentPixelation);

      if (currentPixelation === 1) {
        feedback.textContent = "Image is fully revealed!";
        revealBtn.disabled = true;
      }
    }
  });

  submitBtn.addEventListener('click', () => {
    const guess = guessInput.value.trim().toLowerCase();
    if (!guess) {
      feedback.textContent = "Please enter a guess!";
      return;
    }
    if (guess === answer) {
      feedback.textContent = `Correct! Your final score is ${score}. 🎉`;
      revealBtn.disabled = true;
      submitBtn.disabled = true;
    } else {
      feedback.textContent = "Wrong guess, try again!";
    }
  });

  updateScore();
});
