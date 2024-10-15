// JavaScript for Stopwatch Functionality
let startTime = 0;
let elapsedTime = 0;
let stopwatchInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');
const currentDateElem = document.getElementById('current-date');
const currentTimeElem = document.getElementById('current-time');

// Function to format time
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

// Function to start or pause the stopwatch
startPauseBtn.addEventListener('click', function () {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    } else {
        clearInterval(stopwatchInterval);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
    }
});

// Function to reset the stopwatch
resetBtn.addEventListener('click', function () {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapsContainer.innerHTML = '';
});

// Function to record lap times
lapBtn.addEventListener('click', function () {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
});

// Function to update the current date and time
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElem.textContent = now.toLocaleDateString(undefined, dateOptions);
    currentTimeElem.textContent = now.toLocaleTimeString();
}

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display date and time on load
updateDateTime();
