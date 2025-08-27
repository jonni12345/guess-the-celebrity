let score = 100;
let maxPixelation = 20; // max blur
let currentPixelation = maxPixelation;

const image = document.getElementById('celebrity-image');
const clueButton = document.getElementById('clue-button');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score-display');

const data = {
  "answer": "Zendaya"
  // add more data or change dynamically as needed
};

function updateImage() {
  image.style.filter = `blur(${currentPixelation}px)`;
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

clueButton.addEventListener('click', () => {
  if (currentPixelation > 0) {
    currentPixelation -= 4;
    if (currentPixelation < 0) currentPixelation = 0;
    
    // decrease score but not below zero
    score = Math.max(0, score - 20);
    updateScore();
    updateImage();
  } else {
    message.textContent = "Image is fully revealed!";
  }
});

submitButton.addEventListener('click', () => {
  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) {
    message.textContent = "Please enter a guess!";
    return;
  }
  if (guess === data.answer.toLowerCase()) {
    message.textContent = `Correct! Your final score is ${score}. 🎉`;
    clueButton.disabled = true;
    submitButton.disabled = true;
  } else {
    message.textContent = "Wrong guess, try again!";
  }
});

// Initialize
updateImage();
updateScore();
message.textContent = "Guess who this is!";
