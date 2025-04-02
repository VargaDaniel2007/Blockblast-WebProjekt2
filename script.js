//grid

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let rectPosX = 50;
let rectPosY = 50;
let rectW = 50;
let rectH = 50;
let rectOffsetX = 0;
let rectOffsetY = 0;


/*
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
*/
//ctx.fillStyle = "red";
//ctx.fillRect(50, 50, 50, 50);


const ctx2 = document.getElementById('overlay').getContext('2d');

window.addEventListener("load", () =>{
    drawChart();
    generate();
})



function drawChart(){
    let width = canvas.width;
    for (let i = 0; i * 70 < width; i++){
        for (let k= 0; k < width; k++){
            ctx.rect(k *70, i*70, 70, 70);
        }
    }
    ctx.stroke();
}


//game

let wrectPosX = 70;
let wrectPosY = 70;
let wrectW = 70;
let wrectH = 70;
let drag = false;
let wrectOffsetX = 0;
let wrectOffsetY = 0;
ctx2.fillRect(wrectPosX, wrectPosY, wrectW, wrectH);

document.getElementById('overlay').addEventListener('mousedown', (event) => {
    // console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    if(event.offsetX > wrectPosX && event.offsetX < wrectPosX + wrectW)
        if(event.offsetY > wrectPosY && event.offsetY < wrectPosY + wrectH){
            drag = true;
            wrectOffsetX = event.offsetX - wrectPosX;
            wrectOffsetY = event.offsetY - wrectPosY;
        }

});
document.getElementById('overlay').addEventListener('mousemove', (event) => {
    if(drag){
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
    if(drag){
        drag = false;
        drop(event);

    }

});
document.getElementById('overlay').addEventListener('click', (event) => {
    //console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

});

let field = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

function generate(){
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            field[i][j] = false;
        }
    }
    console.log(field)

}

//holder ==> mozgatott objekt

function drop(ev) {
    if (ev.offsetY < 561){
        let beszinezve = 0;
        let oszlopBeszinezve = 0;
        let index = [];
        let oszlop = [];

        let droppedX = Math.floor(ev.offsetX /70);
        let droppedY = Math.floor(ev.offsetY /70);
        field[droppedY][droppedX] = true;
        console.log(droppedX, droppedY)
        ctx.fillStyle = "black"
        ctx.fillRect(droppedX *70, droppedY * 70, 70, 70);

        console.log(field)


        for(let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (field[i][j] == true){
                    ++beszinezve;
                }

            }
            if (beszinezve == 8){
                index.push(i);

            }
            beszinezve = 0;

            for (let k = 0; k < 8; k++){
                if (field[k][i] == true){
                    ++oszlopBeszinezve;
                }
            }
            if (oszlopBeszinezve == 8){
                oszlop.push(i);
            }
            oszlopBeszinezve = 0;

        }
        
        console.log(oszlop)
        //törlés
        for (let i = 0; i < index.length; i++){
            ctx.clearRect(0, index[i]*70, canvas.width, 70);
            for (let k= 0; k * 70 < canvas.width; k++){
                console.log("szexpéter")
                ctx.rect(k *70, i*70, 70, 70);
                field[index[i]][k] = false;

            }
            ctx.stroke();
            
        }
        index = [];

        for (let i = 0; i < oszlop.length; i++){
            ctx.clearRect(oszlop[i]*70, 0, 70, canvas.height);
            for (let m = 0; m < 8; m++){
                console.log("csaba")
                ctx.rect(i * 70, m *70, 70, 70);
                field[m][oszlop[i]] = false;
            }
            ctx.stroke();

        }
        oszlop = [];
    
    
        
        /*
        if (parseInt(holder.id) > -1){
            ev.preventDefault();
            //console.log(holder.id)
            //hol van
            field[parseInt(holder.id / 8)][(parseFloat(holder.id / 8) - parseInt(holder.id / 8)) * 8] = true;
    
            //pont-e?
            let beszinezve = 0;
            let index = [];
            let oszlopBeszinezve = 0;
            let oszlop = [];
            for(let i = 0; i < 8; i++){
                for (let j = 0; j < 8; j++){
                    if (field[i][j] == true){
                        ++beszinezve;
                    }
    
                }
                if (beszinezve == 8){
                    index.push(i);
                }
                beszinezve = 0;
    
                for (let k = 0; k < 8; k++){
                    if (field[k][i] == true){
                        ++oszlopBeszinezve;
                    }
                }
                if (oszlopBeszinezve == 8){
                    oszlop.push(i);
                }
                oszlopBeszinezve = 0;
            }
            for (let k = 0; k < index.length; k++){
                let id = 0;
                for (let m = 0; m < 8; m++){
                    //visszafejteni id-re, 0,125-el nő
                    document.getElementById(index[k] * 8 + id * 8).innerHTML = "";
                    field[index[k]][id * 8] = false;
                    id += 0.125
                }
            }
    
            for (let k = 0; k < oszlop.length; k++){
                let id = oszlop[k];
                for (let m = 0; m < 8; m++){
                    //visszafejteni id-re, 0,125-el nő
                    document.getElementById(id).innerHTML = "";
                    field[m][id] = false;
                    id += 8
                }
            }
            index = [];
        
        
        
            //új generálása
            if (selection.innerHTML.trim() == ''){
                for (let i = 0; i < 3; i++){
                }
            }
        }
        */
    }

}
  
