let video = document.getElementById('video');
let audio = document.getElementById('audio');
let timeDisplay = document.getElementById('time-display');
let playButton = document.querySelector('.play');
let timer;
let duration = 10 * 60; // default 10 minutes

function switchSound(type) {
    if (type === 'beach') {
        video.src = 'videos/beach.mp4';
        audio.src = 'sounds/beach.mp3';
    } else if (type === 'rain') {
        video.src = 'videos/rain.mp4';
        audio.src = 'sounds/rain.mp3';
    }
    audio.play();
    video.play();
}

function setTime(minutes) {
    duration = minutes * 60;
    timeDisplay.textContent = `${minutes}:00`;
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        video.play();
        playButton.textContent = 'Pause';
        startTimer();
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
            timeDisplay.textContent = '0:00';
            return;
        }

        remainingTime--;
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}

describe('Meditation App', () => {
  const baseUrl = 'http://localhost:8080'; // replace with your actual base URL

  const expectPlayingAudio = (playing = true) => {
    cy.get('audio').then($audio => {
      if (playing) {
        expect($audio[0].paused).to.be.false;
      } else {
        expect($audio[0].paused).to.be.true;
      }
    });
  };

  beforeEach(() => {
    cy.visit(baseUrl + '/main.html'); // Ensure this is set to baseUrl + "/main.html"
  });

  it('should play and pause the audio', () => {
    // Initially, the audio should be paused
    expectPlayingAudio(false);

    // Click the play button, the audio should start playing
    cy.get('.play').click();
    cy.wait(500); // wait for a while to let the audio start playing
    expectPlayingAudio();

    // Click the play button again, the audio should pause
    cy.get('.play').click();
    cy.wait(500); // wait for a while to let the audio pause
    expectPlayingAudio(false);
  });

  // Handle the uncaught:exception event to prevent the test from failing
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('The play() request was interrupted by a call to pause()')) {
      return false;
    }
    return true;
  });
});
