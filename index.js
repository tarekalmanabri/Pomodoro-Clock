/**
  In this week 's project you'll be making a Pomodoro Clock!
  A user can specify how many minutes the timer should be set, and with a click on the play button it starts counting down!If the user wants to pause the timer, they can do so by clicking the pause button.

  If the timer is running, the user can 't change the session length anymore
  Use at least 3 functions
  Display minutes and seconds
  If the timer finishes the timer should be replaced by the message: Time 's up!
 * 
 */

const increasing = document.getElementById('increase');
const minutes = document.getElementById('minutes');
const decreasing = document.getElementById('decrease');
const timeDisplay = document.getElementById('timer');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const pause = document.getElementById('pause');

let minutesTimer = 25;
let secondsTimer = minutesTimer * 60;
let isPlaying = false;
let isPaused = false;
let interval;

function outputTime(timeInSeconds) {
    const remainder = timeInSeconds % 60;
    const minutesInSeconds = timeInSeconds - remainder;
    let seconds = remainder;

    if (seconds < 10) {
        seconds = "0" + seconds
    }

    timeDisplay.innerText = minutesInSeconds / 60 + ':' + seconds;
}

function timeChange(newAmount) {
    if (isPlaying || isPaused) {
        return
    }
    minutesTimer = newAmount;
    minutes.innerText = minutesTimer;
    secondsTimer = minutesTimer * 60;
    outputTime(secondsTimer);
}

function updateCounter() {
    if (secondsTimer <= 0) {
        timeDisplay.innerText = 'Time is up'
        clearInterval(interval);
        return;
    }
    secondsTimer--;

    outputTime(secondsTimer);
}

function startCounter() {
    isPlaying = true;
    isPaused = false;
    interval = setInterval(updateCounter, 1000);
}

function stopCounter() {
    isPlaying = false;
    isPaused = false;
    clearInterval(interval);
    timeChange(minutesTimer);
}

function pauseCounter() {
    if (isPaused === true) {
        return;
    }

    isPaused = true;
    clearInterval(interval)
}

play.addEventListener('click', function() {
    startCounter();
    togglePlay(false);
});

stop.addEventListener('click', function() {
    stopCounter();
    togglePlay(true);
});

pause.addEventListener('click', function() {
    if (isPlaying === false) {
        return;
    }

    togglePlay(true);
    pauseCounter();
});

increasing.addEventListener('click', function() {
    timeChange(minutesTimer + 1);
});

decreasing.addEventListener('click', function() {
    if (minutesTimer === 1) {
        return;
    }
    timeChange(minutesTimer - 1);

});

function togglePlay(show) {
    if (show) {
        pause.style.display = 'none';
        play.style.display = 'inline';
    } else {
        play.style.display = 'none';
        pause.style.display = 'inline';
    }
}