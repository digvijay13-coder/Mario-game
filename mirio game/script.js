let score = 0;
let cross = true;
let gameOverPlayed = false; // Flag to ensure game-over audio plays only once

const audio = new Audio('mirio.mp3'); // Background/start audio
const audiogo = new Audio('gover.mp3'); // Game over audio

// Start the game after 1 second and play background music
setTimeout(() => {
    audio.loop = true; // Set background audio to loop
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    if (e.keyCode == 38) { // Up arrow key
        const mario = document.querySelector('.mario');
        mario.classList.add('animateMario');
        setTimeout(() => {
            mario.classList.remove('animateMario');
        }, 700);
    }
    if (e.keyCode == 39) { // Right arrow key
        const mario = document.querySelector('.mario');
        let marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = marioX + 112 + "px";
    }
    if (e.keyCode == 37) { // Left arrow key
        const mario = document.querySelector('.mario');
        let marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (marioX - 112) + "px";
    }
};

setInterval(() => {
    const mario = document.querySelector('.mario');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    let mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    let my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(mx - ox);
    let offsetY = Math.abs(my - oy);

    if (offsetX < 73 && offsetY < 52 ) {
        // Collision detected
        if (!gameOverPlayed) {
            gameOverPlayed = true; // Set the flag to true
            gameOver.innerHTML = "Game Over - Reload to Play Again"; // Display game-over message
            obstacle.style.animation = 'none'; // Stop obstacle animation

            audiogo.play(); // Play game-over sound
            audio.pause(); // Pause background music
            audio.currentTime = 0; // Reset background music to the beginning
        }
    } else if (offsetX < 145 && cross) {
        // Successfully avoided collision
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    const scoreCont = document.querySelector('#scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}
