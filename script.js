import {Alakzat, Blokk} from "./alakzat.js"


//grid

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const L = new Alakzat([[new Blokk(false),new Blokk(false),new Blokk(true)],
[new Blokk(true),new Blokk(true),new Blokk(true)]]);


const shapes = [
    [[new Blokk(false),new Blokk(false),new Blokk(true)],
     [new Blokk(true),new Blokk(true),new Blokk(true)]],              //L
    //L állított
        [[new Blokk(true), new Blokk(false)],
         [new Blokk(true), new Blokk(false)],
         [new Blokk(true), new Blokk(true)]],

    //L tükör
        [[new Blokk(true), new Blokk(false), new Blokk(false)],
         [new Blokk(true), new Blokk(true), new Blokk(true)]],
    //L tükör állított
        [[new Blokk(false), new Blokk(true)],
         [new Blokk(false), new Blokk(true)],
         [new Blokk(true), new Blokk(true)]],

    //Z
        [[new Blokk(false), new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(true), new Blokk(false)]],

    //Z állított
        [[new Blokk(true), new Blokk(false)],
         [new Blokk(true), new Blokk(true)],
         [new Blokk(false), new Blokk(true)]],

    //Z tükör
        [[new Blokk(true), new Blokk(true), new Blokk(false)],
         [new Blokk(false), new Blokk(true), new Blokk(true)]],

    //Z tükör állított
        [[new Blokk(false), new Blokk(true)],
         [new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(false)]],

    //I
        [[new Blokk(true)],
         [new Blokk(true)],
         [new Blokk(true)]],

    //I fektetett
        [[new Blokk(true), new Blokk(true), new Blokk(true)]],

    //Négyzet
        [[new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(true)]],

    //Nagy négyzet
        [[new Blokk(true), new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(true), new Blokk(true)]],


    //Téglalap
        [[new Blokk(true), new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(true), new Blokk(true)]],

    //Téglalap állított
        [[new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(true)]],


    //Nagy L
        [[new Blokk(true), new Blokk(false), new Blokk(false)],
         [new Blokk(true), new Blokk(false), new Blokk(false)],
         [new Blokk(true), new Blokk(true), new Blokk(true)]],

    //Nagy L tükör
        [[new Blokk(false), new Blokk(false), new Blokk(true)],
         [new Blokk(false), new Blokk(false), new Blokk(true)],
         [new Blokk(true), new Blokk(true), new Blokk(true)]],

    //Nagy L fejjel lefelé
        [[new Blokk(true), new Blokk(true), new Blokk(true)],
         [new Blokk(true), new Blokk(false), new Blokk(false)],
         [new Blokk(true), new Blokk(false), new Blokk(false)]],

    //Nagy L fejjel lefelé tükör
        [[new Blokk(true), new Blokk(true), new Blokk(true)],
         [new Blokk(false), new Blokk(false), new Blokk(true)],
         [new Blokk(false), new Blokk(false), new Blokk(true)]]

];

console.log(L)
const coor = {X: 0, Y: 0,
    setCoor: function(x, y){
        this.X = x,
        this.Y = y
}};

const aktivShapeCoor = [new coor.setCoor(10, 585), new coor.setCoor(200, 585), new coor.setCoor(500, 585)]; //TODO: Megoldás a kicsúszásra

const aktivshapes = [undefined, undefined, undefined];




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

// });
*/
//ctx.fillStyle = "red";
//ctx.fillRect(50, 50, 50, 50);
const ctx2 = document.getElementById('overlay').getContext('2d');


window.addEventListener("load", () =>{
    drawChart();
    generate();
    aktivshapesFill();
    console.log(aktivshapes)
    aktivshapesDraw();
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
let dragged = undefined;
let wrectOffsetX = 0;
let wrectOffsetY = 0;
//ctx2.fillRect(wrectPosX, wrectPosY, wrectW, wrectH);

document.getElementById('overlay').addEventListener('mousedown', (event) => {
    // console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    //Kocka
    for(let i = 0; i < aktivshapes.length; i++){
        const alakzat = aktivshapes[i];
        if(alakzat != undefined){
            alakzat.Space.forEach(row => {
                row.forEach(blokk =>{
                    if (blokk.Bool == true){
                        if (blokk.X < event.offsetX && blokk.X + 70 > event.offsetX){
                            if (blokk.Y < event.offsetY && blokk.Y + 70 > event.offsetY){
                                dragged = i;
                                alakzat.Offset.X = event.offsetX - alakzat.Space[0][0].X;
                                alakzat.Offset.Y = event.offsetY - alakzat.Space[0][0].Y;
                                // console.log(L.Space[0][0].X)
                            }
                        }
                    }
                })
            });
        }
    };

    /*
    if(event.offsetX > wrectPosX && event.offsetX < wrectPosX + wrectW){
        if(event.offsetY > wrectPosY && event.offsetY < wrectPosY + wrectH){
            drag = true;
            wrectOffsetX = event.offsetX - wrectPosX;
            wrectOffsetY = event.offsetY - wrectPosY;
        }
    }
    */

});
document.getElementById('overlay').addEventListener('mousemove', (event) => {
    if(dragged != undefined){
        /*
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.fillRect(event.offsetX - wrectOffsetX, event.offsetY - wrectOffsetY, wrectW, wrectH)
        wrectPosX = event.offsetX - wrectOffsetX;
        wrectPosY = event.offsetY - wrectOffsetY;
        let kezdoX = 217;
        let kezdoY = 617;
        */
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        let alakzat = aktivshapes[dragged];
        alakzat.Rajz(event.offsetX -  alakzat.Offset.X, event.offsetY -  alakzat.Offset.Y, ctx2)
        /*
        for (let i = 0; i< alakzat.Space.length; i++){
            for (let j = 0; j < alakzat.Space[i].length; j++){
                if (alakzat.Space[i][j].Bool == true){
                    ctx2.fillRect( event.offsetX -  alakzat.Offset.X + j*70, event.offsetY - alakzat.Offset.Y + i * 70, 70, 70)
                    alakzat.Space[i][j].X = event.offsetX -  alakzat.Offset.X + j *70;
                    alakzat.Space[i][j].Y = event.offsetY - alakzat.Offset.Y + i * 70;
                }
                else{
                    alakzat.Space[i][j].X = event.offsetX -  alakzat.Offset.X + j *70;
                    alakzat.Space[i][j].Y = event.offsetY - alakzat.Offset.Y + i * 70;
                }
                // console.log(L.Space[0][2].Y)
            }
        */
        // }
        for(let i = 0; i < aktivshapes.length; i++){
            if(i != dragged && aktivshapes[i] != undefined){
                aktivshapes[i].Rajz(aktivShapeCoor[i].X, aktivShapeCoor[i].Y, ctx2);
            }
        }

        //console.log(L.Space)
    }
});



window.addEventListener('mouseup', (event) => {
    // console.log(event)
    // console.log(event.offsetX);
    // console.log(event.offsetY);
    if(dragged != undefined){
        let alakzat = aktivshapes[dragged];
        // alakzat.Offset.X = 0;
        // alakzat.Offset.Y = 0;
        drop(event, alakzat, dragged);
        // aktivshapes[dragged] = undefined;
        dragged = undefined;
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        aktivshapesDraw();
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

}

function aktivshapesFill(){
    for(let i = 0; i < 3; i++){
        let index = Math.floor(Math.random() * shapes.length);
        aktivshapes[i] = new Alakzat(shapes[1]);
    }
}

function aktivshapesDraw(){
    for(let i = 0; i < 3; i++){
        if(aktivshapes[i] != undefined){
            aktivshapes[i].Rajz(aktivShapeCoor[i].X, aktivShapeCoor[i].Y, ctx2);
            console.log(aktivshapes[i].Shape)
        }
    }
}

//holder ==> mozgatott objekt

function drop(ev, dragged, draggedIndex) {
    if (ev.offsetY < 561){
        let beszinezve = 0;
        let oszlopBeszinezve = 0;
        let index = [];
        let oszlop = [];

        let droppedX = Math.floor(ev.offsetX /70);
        let droppedY = Math.floor(ev.offsetY /70);
        // console.log(droppedX, droppedY);
        //field[droppedY][droppedX] = true;
        
        //Alakzat hely ellenőrzés
        let coorOffset = dragged.HolFog(ev.offsetX, ev.offsetY);
        console.log(coorOffset);
        if(coorOffset == null){
            coorOffset = {X: 0, Y: 0};
        }
        if(droppedX - coorOffset.X >= 0 && droppedY - coorOffset.Y >= 0){
            droppedX -= coorOffset.X;
            droppedY -= coorOffset.Y;

            //Alakzat üres helyek ellenőrzés
            let dSpace = dragged.Space;
            let szabad = true;
            for(let bY = 0; bY < dSpace.length; bY++){
                for(let bX = 0; bX < dSpace[bY].length; bX++){
                    if(dSpace[bY][bX].Bool && field[droppedY + bY][droppedX + bX]){
                        szabad = false;
                    }
                }
            }
            if(szabad){
                for(let bY = 0; bY < dSpace.length; bY++){
                    for(let bX = 0; bX < dSpace[bY].length; bX++){
                        if(dSpace[bY][bX].Bool){
                            field[droppedY + bY][droppedX + bX] = true;
                            ctx.fillRect((droppedX + bX )*70, (droppedY + bY) * 70, 70, 70);
                            aktivshapes[draggedIndex] = undefined;
                        }
                    }
                }   
            }
        }




        ctx.fillStyle = "black"
        //ctx.fillRect(droppedX *70, droppedY * 70, 70, 70);

        //console.log(field)


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
        
        //console.log(oszlop)
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


    //Van-e lehetséges opció
    GameEndCheck();
}

function GameEndCheck(){
    let gameEndDb = GameEndAlakzatCheck();
    let undefinedDb = UndefinedCheck();
    if(gameEndDb != 0 && gameEndDb == 3 - undefinedDb){
        alert("Nincs lehetséges lépés")
    }
    if(undefinedDb == 3){
        aktivshapesFill();
        while(GameEndAlakzatCheck() == 3){
            aktivshapesFill();  //Ha nem játszhatót fillelne először
        }
    }
}

function UndefinedCheck(){
    let undefinedDb = 0;
    aktivshapes.forEach(alakzat => {
        if(alakzat == undefined)
            undefinedDb++;
    });
    return undefinedDb;
}
function GameEndAlakzatCheck(){
    let gameEndDb = 0;
    aktivshapes.forEach(alakzat => {
        if(alakzat != undefined)
            if(!AlakzatLepesCheck(alakzat))
                gameEndDb++;
    });
    return gameEndDb;
}

/**
 * @param {Alakzat} object 
 */
function AlakzatLepesCheck(object){
    for(let y = 0; y < field.length; y++){
        for(let x = 0; x < field[y].length; x++){
            if(BlokkCheck(x, y, object)){
                return true;     //Van lehetséges lépés
            }
        }
    }
    return false;       //Nincs lehetséges lépés
}

/**
 * @param {Alakzat} object 
 */
function BlokkCheck(x, y, object){
    for(let bY = 0; bY < object.Space.length; bY++){
        for(let bX = 0; bX < object.Space[bY].length; bX++){
            if(y + bY >= 8 || x + bX >= 8){
                return false;
            }
            if(object.Space[bY][bX].Bool){
                if(field[y + bY][x + bX]){
                    return false;
                }
            }
        }
    }
    return true;
}

let kezdoX = 217;
let kezdoY = 617;

// for (let i = 0; i< L.Space.length; i++){
//     for (let j = 0; j < L.Space[i].length; j++){
//         if (L.Space[i][j].Bool == true){
//             ctx2.fillRect( kezdoX + j*70, kezdoY + i * 70, 70, 70);
//             L.Space[i][j].X = kezdoX + j *70;
//             L.Space[i][j].Y = kezdoY + i * 70;
//         }
//         else{
//             L.Space[i][j].X = kezdoX + j *70;
//             L.Space[i][j].Y = kezdoY + i * 70;
//         }
//     }

// }
// L.Rajz(kezdoX, kezdoY, ctx2);