const pomodoro = document.querySelector('.pomodoro-btn');
const shortBreak = document.querySelector('.short-break-btn');
const longBreak = document.querySelector('.long-break-btn');
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.querySelector('.start-btn');
const replayIcon = document.querySelector('.replay-icon');

let time = 1500; 
let countdown;
let isPaused = false;
let isStarted = false;
let lastClickedTimer = ''; 

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    return `${displayMinutes}:${displaySeconds}`;
}

function startTimer(time) {
    clearInterval(countdown);
    timerDisplay.textContent = formatTime(time);

    countdown = setInterval(function () {
        if (!isPaused) {
            timerDisplay.textContent = formatTime(time);

            if (time === 0) {
                clearInterval(countdown);
                timerDisplay.textContent=`"Time's up!"`;
                resetTimer();
            } else {
                time--;
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    isPaused = false;
    isStarted = false;
    startBtn.textContent = "Start";
    startBtn.removeEventListener('click', pauseTimer);
    startBtn.removeEventListener('click', resumeTimer);
    startBtn.addEventListener('click', startButtonClick);

    if (lastClickedTimer === 'pomodoro') {
        time = 1500; 
        timerDisplay.textContent = "25:00"; 
    } else if (lastClickedTimer === 'shortBreak') {
        time = 300;
        timerDisplay.textContent = "05:00";
    } else if (lastClickedTimer === 'longBreak') {
        time = 600; // 10 minutes
        timerDisplay.textContent = "10:00";f
    }
}

function startButtonClick() {
    isPaused = false;
    isStarted = true;
    startBtn.textContent = "Pause";
    startBtn.removeEventListener('click', startButtonClick);
    startBtn.addEventListener('click', pauseTimer);
    startTimer(time);
}

function pauseTimer() {
    isPaused = true;
    startBtn.textContent = "Start";
    startBtn.removeEventListener('click', pauseTimer);
    startBtn.addEventListener('click', startButtonClick);
}

function resumeTimer() {
    isPaused = false;
    startBtn.textContent = "Pause";
    startBtn.removeEventListener('click', resumeTimer);
    startBtn.addEventListener('click', pauseTimer);
}

pomodoro.addEventListener('click', () => {
    if (isStarted) {
        resetTimer();
    }
    lastClickedTimer = 'pomodoro';
    time = 1500;
    timerDisplay.textContent = formatTime(time);
});

shortBreak.addEventListener('click', () => {
    if (isStarted) {
        resetTimer();
    }
    lastClickedTimer = 'shortBreak';
    time = 300;
    timerDisplay.textContent = formatTime(time);
});

longBreak.addEventListener('click', () => {
    if (isStarted) {
        resetTimer();
    }
    lastClickedTimer = 'longBreak';
    time = 600; 
    timerDisplay.textContent = formatTime(time);
});

startBtn.addEventListener('click', startButtonClick);

replayIcon.addEventListener('click', () => {
  resetTimer();
  lastClickedTimer = ''; 
});