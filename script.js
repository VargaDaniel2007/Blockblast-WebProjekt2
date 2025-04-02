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
