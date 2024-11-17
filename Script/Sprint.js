let timers = [];

const addTimerButton = document.getElementById('addTimerButton');
const timersList = document.getElementById('timersList');

addTimerButton.addEventListener('click', addTimer);

function addTimer() {
    const timerName = document.getElementById('timerName').value.trim();
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60 || !timerName) {
        alert('Введите корректные значения для минут, секунд и имени таймера.');
        return;
    }

    const timerId = `timer-${timers.length}`;
    const timer = {
        id: timerId,
        name: timerName,
        totalTime: minutes * 60 + seconds,
        remainingTime: minutes * 60 + seconds,
        interval: null
    };

    timers.push(timer);
    renderTimers();
}

function renderTimers() {
    timersList.innerHTML = '';
    timers.forEach(timer => {
        const timerElement = document.createElement('div');
        timerElement.id = timer.id;
        timerElement.classList.add('timer-item');
        timerElement.innerHTML = `
            <span>${timer.name}</span>
            <span id="timeDisplay-${timer.id}">${formatTime(timer.remainingTime)}</span>
            <button onclick="startTimer('${timer.id}')">Запуск</button>
            <button onclick="stopTimer('${timer.id}')">Стоп</button>
            <button onclick="resetTimer('${timer.id}')">Сброс</button>
            <button onclick="deleteTimer('${timer.id}')">Удалить</button>
            <div class="progress-bar">
                <div class="progress" id="progress-${timer.id}"></div>
            </div>
        `;
        timersList.appendChild(timerElement);
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer(id) {
    const timer = timers.find(t => t.id === id);
    if (!timer) return;

    if (timer.interval) clearInterval(timer.interval);

    timer.interval = setInterval(() => {
        if (timer.remainingTime > 0) {
            timer.remainingTime--;
            document.getElementById(`timeDisplay-${timer.id}`).textContent = formatTime(timer.remainingTime);
            updateProgressBar(timer);
        } else {
            clearInterval(timer.interval);
            alert('Время вышло!');
        }
    }, 1000);
}

function stopTimer(id) {
    const timer = timers.find(t => t.id === id);
    if (timer && timer.interval) clearInterval(timer.interval);
}

function resetTimer(id) {
    const timer = timers.find(t => t.id === id);
    if (timer) {
        clearInterval(timer.interval);
        timer.remainingTime = timer.totalTime;
        document.getElementById(`timeDisplay-${timer.id}`).textContent = formatTime(timer.remainingTime);
        document.getElementById(`progress-${timer.id}`).style.width = '0%';
    }
}

function deleteTimer(id) {
    timers = timers.filter(t => t.id !== id);
    renderTimers();
}

function updateProgressBar(timer) {
    const progress = ((timer.totalTime - timer.remainingTime) / timer.totalTime) * 100;
    document.getElementById(`progress-${timer.id}`).style.width = `${progress}%`;
}