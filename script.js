

let score = 0;
let timeLeft = 30;
let gameInterval;
let clickTimer;
const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverDisplay = document.getElementById('gameOver');
const playButton = document.getElementById('playButton');
const resetButton = document.getElementById('resetButton');
const hintButton = document.getElementById('hintButton');
let isGameOver = false;
let hintMessages = [
    "Click quickly to score more points!",
    "Keep an eye on the timer!",
    "Missing clicks will decrease your time!",
    "Try to anticipate the circle's movement!"
];
let hintIndex = 0;

function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = 'Time Left: ' + timeLeft + 's';
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = 'Time Left: ' + timeLeft + 's';
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearTimeout(clickTimer); // Clear the click timer if active
    isGameOver = true;
    gameOverDisplay.style.display = 'block';
    hintButton.textContent = 'Game Over! Click Reset to play again.';
    circle.style.animationPlayState = 'paused'; // Stop animation
    resetButton.style.display = 'block';
}

function startClickTimer() {
    clickTimer = setTimeout(() => {
        if (!isGameOver) {
            timeLeft -= 2; // Decrease time if click is missed
            timerDisplay.textContent = 'Time Left: ' + timeLeft + 's';
            if (timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000); // Time window to register click (1 second)
}

function updateHint() {
    hintButton.textContent = hintMessages[hintIndex];
    hintIndex = (hintIndex + 1) % hintMessages.length;
}

playButton.addEventListener('click', () => {
    score = 0;
    isGameOver = false;
    scoreDisplay.textContent = 'Score: ' + score;
    gameOverDisplay.style.display = 'none';
    resetButton.style.display = 'none';
    playButton.style.display = 'none';
    circle.style.animationPlayState = 'running'; // Start animation
    startTimer();
    startClickTimer();
    updateHint(); // Set initial hint
});

circle.addEventListener('click', () => {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        circle.style.animationDuration = Math.max(1, 5 - score * 0.2) + 's'; // Increase speed

        if (score >= 20) { // Game over condition
            endGame();
        }

        clearTimeout(clickTimer); // Clear the previous click timer
        startClickTimer(); // Restart the click timer
    }
});

resetButton.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    gameOverDisplay.style.display = 'none';
    hintButton.textContent = 'Click on the circle to score points!';
    timerDisplay.textContent = 'Time Left: 30s';
    isGameOver = false;
    circle.style.animationDuration = '5s';
    circle.style.animationPlayState = 'running'; // Restart animation
    startTimer();
    startClickTimer();
    updateHint(); // Reset hint
});

hintButton.addEventListener('click', () => {
    updateHint(); // Update hint on button click
});

