// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');
// const CANVAS_WIDTH = canvas.width =600; // change to 1200 when not in inspect mode        //GLOBAL VAR
// const CANVAS_HEIGHT = canvas.height = 600;      //GLOBAL VAR

// const playerImage = new Image();

// playerImage.src = './sprites/run.png';
// const spriteWidth = 120;
// const spriteHeight = 80;
// const floor = 520; //440
// let frameX = 0;
// let frameY = 0;
// let lastTime = 0;
// let frameDelay = 79; //milliseconds
// let frame = 9;


// function animate(timestamp){

    
//     if (timestamp - lastTime >= frameDelay) {
//         ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//         ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, floor, spriteWidth, spriteHeight);
//         if (frameX < frame) frameX++;
//         else frameX = 0;
//         lastTime = timestamp; //update lastTime so that the next iteration's timestamp starts at lastime, so there is another interval
//     }
//     requestAnimationFrame(animate);
// };


// animate(); // main painter function

// document.addEventListener('keydown', () => { 
//     console.log(event.key);
//     pressed = event.key;
//     if (pressed === "x")
//     { 
//         playerImage.src = './sprites/roll.png';
//         frameDelay = 56;
//         frame = 11;
//     }
// });


const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = 900;
canvas.height = 600;

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6 // control how fast knight falls down
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 80
        this.lastKey
    }
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 120, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y > canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}   

const knight = new Sprite({
    position: {
        x:0, 
        y:0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    },
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    knight.update()
    
    knight.velocity.x = 0
    if(keys.ArrowLeft.pressed && knight.lastKey === 'ArrowLeft'){
        knight.velocity.x = -4
    }
    else if (keys.ArrowRight.pressed && knight.lastKey === 'ArrowRight'){
        knight.velocity.x = 4
    }
}
animate()

window.addEventListener('keydown', (event)=>{
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            knight.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            knight.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            knight.velocity.y = -20 //jump height
            break
    }
    console.log(event.key)

})

window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
    console.log(event.key)

})