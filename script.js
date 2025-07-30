const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;        //GLOBAL VAR
const CANVAS_HEIGHT = canvas.height = 600;      //GLOBAL VAR

const playerImage = new Image();

playerImage.src = './sprites/idle.png';
const spriteWidth = 120;
const spriteHeight = 80;
const floor = 440; //520
let frameX = 0;
let frameY = 0;
let lastTime = 0;
let frameDelay = 150; //milliseconds



function animate(timestamp){
    if (timestamp - lastTime >= frameDelay) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, floor, spriteWidth*2, spriteHeight*2);
        if (frameX < 6) frameX++;
        else frameX = 0;
        lastTime = timestamp; //update lastTime so that the next iteration's timestamp starts at lastime, so there is another interval
    }
    requestAnimationFrame(animate);
};


animate(); // main painter function