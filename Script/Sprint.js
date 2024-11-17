let timerInterval;
let remainingTime;
let totalTime;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const timeDisplay = document.getElementById('timeDisplay');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const progressBar = document.querySelector('.progress');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) {
        alert('Введите корректные значения для минут и секунд.');
        return;
    }
    
    remainingTime = totalTime = minutes * 60 + seconds;

    if (remainingTime > 0) {
        timerInterval = setInterval(updateTimer, 1000);
        updateProgressBar();
    }
}

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        clearInterval(timerInterval);
        alert('Время вышло!');
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    minutesInput.value = '';
    secondsInput.value = '';
    timeDisplay.textContent = '00:00';
    progressBar.style.width = '0%';

    // Сбрасываем оставшееся время и вызываем обновление шкалы прогресса
    remainingTime = 0;
    updateProgressBar();
}

function updateProgressBar() {
    if (remainingTime > 0) {
        const progress = ((totalTime - remainingTime) / totalTime) * 100;
        progressBar.style.width = `${progress}%`;
        requestAnimationFrame(updateProgressBar);
    } else {
        progressBar.style.width = '0%'; // Убедимся, что шкала прогресса обнуляется при завершении
    }
}