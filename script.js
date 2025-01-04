let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let isGameOver = false;

// Game elements
const scoreElement = document.getElementById('score');
const boxElement = document.getElementById('box');
const timerElement = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');

// Sound elements
const clickSound = new Audio('click.mp3');  // Add your click sound effect file
const gameOverSound = new Audio('gameover.mp3');  // Add your game over sound effect file

// Start the game
function startGame() {
  // Reset game variables
  score = 0;
  timeLeft = 30;
  updateScore();
  updateTimer();

  // Hide game-over screen if it's visible
  gameOverElement.classList.add('hidden');
  gameOverElement.classList.remove('show');  // Hide the game-over screen

  // Clear any previous intervals
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  // Move the box every second
  gameInterval = setInterval(moveBox, 1000);

  // Countdown timer
  timerInterval = setInterval(countdown, 1000);

  // Reset game over flag
  isGameOver = false;
}

// Move the box with smooth animation
function moveBox() {
  const gameContainer = document.querySelector('.game-container');
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;

  // Random position
  const x = Math.random() * (containerWidth - 50);
  const y = Math.random() * (containerHeight - 50);

  // Apply smooth animation
  boxElement.style.transition = 'left 0.5s ease, top 0.5s ease';
  boxElement.style.left = `${x}px`;
  boxElement.style.top = `${y}px`;

  // Increase movement speed as the score increases
  clearInterval(gameInterval);
  gameInterval = setInterval(moveBox, Math.max(200, 1000 - score * 50));
}

// Handle box mouseover
boxElement.addEventListener('mouseover', function () {
  if (isGameOver) return;

  // Trigger color change on touch
  boxElement.classList.add('hovered');
  setTimeout(() => boxElement.classList.remove('hovered'), 200);
});

// Handle box click
boxElement.addEventListener('click', function () {
  if (isGameOver) return;

  clickSound.play();  // Play click sound

  score++; // Increase score
  updateScore();

  // Trigger animation on hit
  boxElement.classList.add('clicked');
  setTimeout(() => boxElement.classList.remove('clicked'), 200);

  // Move the box to a new random position
  moveBox();
});

// Update score display
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Countdown timer function
function countdown() {
  if (timeLeft <= 0) {
    endGame();
    return;
  }

  timeLeft--;
  updateTimer();
}

// Update timer display
function updateTimer() {
  timerElement.textContent = `Time Left: ${timeLeft}s`;
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  isGameOver = true;
  gameOverSound.play();  // Play game over sound
  showGameOver();
}

// Show the game over screen with score
function showGameOver() {
  finalScoreElement.textContent = score;
  gameOverElement.classList.remove('hidden');
  gameOverElement.classList.add('show');  // Show the game-over screen
}

// Restart the game when the button is clicked
restartBtn.addEventListener('click', function () {
  startGame();  // Restart the game
});

// Start the game when the page loads
startGame();
