// script.js
let video = document.getElementById('video');
let audio = document.getElementById('audio');
let timeDisplay = document.querySelector('.time-display');
let playButton = document.querySelector('.play');
let timer;
let duration = 10 * 60; // default 10 minutes

function switchSound(type) {
    if (type === 'beach') {
        video.src = './video/beach.mp4';
        audio.src = './sounds/beach.mp3';
    } else if (type === 'rain') {
        video.src = './video/rain.mp4';
        audio.src = './sounds/rain.mp3';
    }
    audio.play();
    video.play();
}

function setTime(minutes) {
    duration = minutes * 60;
    timeDisplay.textContent = `${minutes}:0`;
}

function togglePlay() {
    if (audio.paused) {
        audio.play().then(() => {
            video.play();
            playButton.textContent = 'Pause';
            startTimer();
        }).catch(error => {
            console.error("Error playing audio:", error);
        });
    } else {
        audio.pause();
        video.pause();
        playButton.textContent = 'Play';
        clearInterval(timer);
    }
}

function startTimer() {
    clearInterval(timer);
    let remainingTime = duration;

    timer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            audio.pause();
            video.pause();
            playButton.textContent = 'Play';
            timeDisplay.textContent = '0:0';
            return;
        }

        remainingTime--;
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? seconds : seconds}`;
    }, 1000);
}
