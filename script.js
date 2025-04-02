const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let rectPosX = 50;
let rectPosY = 50;
let rectW = 50;
let rectH = 50;
let drag = false;
let rectOffsetX = 0;
let rectOffsetY = 0;

canvas.addEventListener('mousedown', (event) => {
    // console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    if(event.offsetX > rectPosX && event.offsetX < rectPosX + rectW)
        if(event.offsetY > rectPosY && event.offsetY < rectPosY + rectH){
            drag = true;
            rectOffsetX = event.offsetX - rectPosX;
            rectOffsetY = event.offsetY - rectPosY;
        }

});
canvas.addEventListener('mousemove', (event) => {
    if(drag){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(event.offsetX - rectOffsetX, event.offsetY - rectOffsetY, rectW, rectH)
        rectPosX = event.offsetX - rectOffsetX;
        rectPosY = event.offsetY - rectOffsetY;
    }
});


window.addEventListener('mouseup', (event) => {
    // console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    drag = false;
});
canvas.addEventListener('click', (event) => {
    console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

});

ctx.fillStyle = "red";
ctx.fillRect(50, 50, 50, 50);


const ctx2 = document.getElementById('overlay').getContext('2d');


let wrectPosX = 70;
let wrectPosY = 70;
let wrectW = 50;
let wrectH = 50;
let wdrag = false;
let wrectOffsetX = 0;
let wrectOffsetY = 0;
ctx2.fillRect(wrectPosX, wrectPosY, 50, 50);

document.getElementById('overlay').addEventListener('mousedown', (event) => {
    // console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    console.log("asd");
    if(event.offsetX > wrectPosX && event.offsetX < wrectPosX + wrectW)
        console.log("asdasd");
        if(event.offsetY > wrectPosY && event.offsetY < wrectPosY + wrectH){
            console.log("Asdasd");
            wdrag = true;
            wrectOffsetX = event.offsetX - wrectPosX;
            wrectOffsetY = event.offsetY - wrectPosY;
        }

});
document.getElementById('overlay').addEventListener('mousemove', (event) => {
    if(wdrag){
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.fillRect(event.offsetX - wrectOffsetX, event.offsetY - wrectOffsetY, wrectW, wrectH)
        wrectPosX = event.offsetX - wrectOffsetX;
        wrectPosY = event.offsetY - wrectOffsetY;
    }
});


window.addEventListener('mouseup', (event) => {
    // console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    wdrag = false;
    if(event.offsetX > rectPosX && event.offsetX < rectPosX + rectW && event.offsetY > rectPosY && event.offsetY < rectPosY + rectH){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        ctx.fillRect(rectPosX, rectPosY, rectW, rectH)
        ctx.fillStyle = "red";
    }
});
document.getElementById('overlay').addEventListener('click', (event) => {
    console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

});