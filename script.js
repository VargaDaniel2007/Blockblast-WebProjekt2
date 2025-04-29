import {Alakzat, Blokk} from "./alakzat.js"



//grid

let endofgame = false;
let pontszam = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const L = new Alakzat([[(false),(false),(true)],
[(true),(true),(true)]]);


const shapes = [
    //L
    [[(false),(false),(true)],
    [(true),(true),(true)]],              
    //L állított
        [[(true), (false)],
         [(true), (false)],
         [(true), (true)]],

    //L tükör
        [[(true), (false), (false)],
         [(true), (true), (true)]],
    //L tükör állított
        [[(false), (true)],
         [(false), (true)],
         [(true), (true)]],

    //Z
        [[(false), (true), (true)],
         [(true), (true), (false)]],

    //Z állított
        [[(true), (false)],
         [(true), (true)],
         [(false), (true)]],

    //Z tükör
        [[(true), (true), (false)],
         [(false), (true), (true)]],

    //Z tükör állított
        [[(false), (true)],
         [(true), (true)],
         [(true), (false)]],

    //I
        [[(true)],
         [(true)],
         [(true)]],

    //I fektetett
        [[(true), (true), (true)]],

    //Négyzet
        [[(true), (true)],
         [(true), (true)]],

    //Nagy négyzet
        [[(true), (true), (true)],
         [(true), (true), (true)],
         [(true), (true), (true)]],


    //Téglalap
        [[(true), (true), (true)],
         [(true), (true), (true)]],

    //Téglalap állított
        [[(true), (true)],
         [(true), (true)],
         [(true), (true)]],


    //Nagy L
        [[(true), (false), (false)],
         [(true), (false), (false)],
         [(true), (true), (true)]],

    //Nagy L tükör
        [[(false), (false), (true)],
         [(false), (false), (true)],
         [(true), (true), (true)]],

    //Nagy L fejjel lefelé
        [[(true), (true), (true)],
         [(true), (false), (false)],
         [(true), (false), (false)]],

    //Nagy L fejjel lefelé tükör
        [[(true), (true), (true)],
         [(false), (false), (true)],
         [(false), (false), (true)]],

    //T
        [[(true), (true), (true)],
         [(false), (true), (false)]],
    //T balra fordítva
        [[(true), (false)],
         [(true), (true)],
         [(true), (false)]],
    //T fejjel lefelé
        [[(false), (true), (false)],
         [(true), (true), (true)]],
    //T jobbra fordítva
        [[(false), (true)],
         [(true), (true)],
         [(false), (true)]]

];

const coor = {X: 0, Y: 0, Color: "",
    setCoor: function(x, y, color){
        this.X = x,
        this.Y = y,
        this.Color = color

}};

let colors = ["red", "green", "blue", "yellow", "brown", "pink", "orange", "purple"]


const aktivShapeCoor = [new coor.setCoor(580, 200, ""), new coor.setCoor(830, 200, ""), new coor.setCoor(1070, 200,"")]; //TODO: Megoldás a kicsúszásra



const aktivshapes = [undefined, undefined, undefined];

const ctx2 = document.getElementById('overlay').getContext('2d');


window.addEventListener("load", () =>{
    let legjobb = Number(sessionStorage.getItem("legjobb_pont")) || 0;
    document.getElementById("bestpontszam").innerHTML = legjobb;
    drawChart();
    generate();
    aktivshapesFill();
    aktivshapesDraw();
})



function drawChart(){
    let height = canvas.height;
    for (let i = 0; i * 70 < height; i++){
        for (let k= 0; k < 8; k++){
            ctx.rect(k *70, i*70, 70, 70);
        }
    }
    ctx.stroke();
}


//game
let dragged = undefined;


document.getElementById('overlay').addEventListener('mousedown', (event) => {
    if (!endofgame){
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

    }

});

document.getElementById('overlay').addEventListener('mousemove', (event) => {
    if(dragged != undefined){
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        let alakzat = aktivshapes[dragged];
        alakzat.Rajz(event.offsetX -  alakzat.Offset.X, event.offsetY -  alakzat.Offset.Y, ctx2, aktivShapeCoor[dragged].Color)
        for(let i = 0; i < aktivshapes.length; i++){
            if(i != dragged && aktivshapes[i] != undefined){
                aktivshapes[i].Rajz(aktivShapeCoor[i].X, aktivShapeCoor[i].Y, ctx2, aktivShapeCoor[i].Color);
            }
        }

        //console.log(L.Space)
    }
});



window.addEventListener('mouseup', (event) => {
    if(dragged != undefined){
        let alakzat = aktivshapes[dragged];
        if(drop(event, alakzat, dragged)){
            aktivshapes[dragged] = undefined;
        }
        dragged = undefined;

        GameEndCheck();
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        aktivshapesDraw();
    }

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
        aktivshapes[i] = new Alakzat(shapes[index]);
    }
    for (let i = 0; i< aktivShapeCoor.length; i ++){
        let index = Math.floor(Math.random() * colors.length);
        aktivShapeCoor[i].Color = colors[index];
    }
}

function aktivshapesDraw(){
    for(let i = 0; i < 3; i++){
        if(aktivshapes[i] != undefined){
            aktivshapes[i].Rajz(aktivShapeCoor[i].X, aktivShapeCoor[i].Y, ctx2, aktivShapeCoor[i].Color);
        }
    }
}

//holder ==> mozgatott objekt

function drop(ev, dragged, dindex) {
    if (ev.offsetY < 561){
        let beszinezve = 0;
        let oszlopBeszinezve = 0;
        let index = [];
        let oszlop = [];

        let droppedX = Math.floor(ev.offsetX /70);
        let droppedY = Math.floor(ev.offsetY /70);
        //field[droppedY][droppedX] = true;
        
        //Alakzat hely ellenőrzés
        let coorOffset = dragged.HolFog(ev.offsetX, ev.offsetY);
        ctx.fillStyle = "black"

        if((droppedX - coorOffset.X >= 0 && droppedX - coorOffset.X + (dragged.Space[0].length - 1) < 8) &&
            (droppedY - coorOffset.Y >= 0 && droppedY - coorOffset.Y + (dragged.Space.length - 1) < 8)){

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
                            ctx.fillStyle = aktivShapeCoor[dindex].Color;
                            ctx.fillRect((droppedX + bX )*70, (droppedY + bY) * 70, 70, 70);
                            ctx.beginPath();
                            ctx.rect((droppedX + bX )*70, (droppedY + bY) * 70, 70, 70);
                            ctx.stroke();
                            pontszam++;
                        }
                    }
                }   
            }
            else{
                return false
            }

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

        //sor
        for (let i = 0; i < index.length; i++){
            ctx.clearRect(0, index[i]*70, canvas.height, 70);
            for (let k= 0; k * 70 < canvas.height; k++){
                console.log("szexpéter")
                ctx.rect(k *70, index[i]*70, 70, 70);
                field[index[i]][k] = false;
            }
            ctx.stroke();
            pontszam += 50;
            
        }
        index = [];




        //oszlop
        for (let i = 0; i < oszlop.length; i++){
            ctx.clearRect(oszlop[i]*70, 0, 70, canvas.height);
            for (let m = 0; m < 8; m++){
                console.log("csaba")
                ctx.rect(oszlop[i] * 70, m *70, 70, 70);
                field[m][oszlop[i]] = false;
            }
            ctx.stroke();
            pontszam += 50;

        }
        oszlop = [];
    

        document.getElementById("pontszam").innerText = pontszam;
    
        if (Number(sessionStorage.getItem("legjobb_pont")) < pontszam){
            document.getElementById("bestpontszam").innerHTML = pontszam;
        }
        

        return true;
        }
    }


}

function GameEndCheck(){
    let gameEndDb = GameEndAlakzatCheck();
    let undefinedDb = UndefinedCheck();
    if(gameEndDb != 0 && gameEndDb == 3 - undefinedDb){
        EndOfGame()
    }
    if(undefinedDb == 3){
        aktivshapesFill();
        let db = 0;

        while(db < 3 && GameEndAlakzatCheck() == 3){
            aktivshapesFill();  //Ha nem játszhatót fillelne először
            db++
        }
        if (db >= 3){
            EndOfGame()
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


function EndOfGame(){
    document.getElementById('restart').style.display = "block";
    document.getElementById('gameover').style.display = "block";
    endofgame = true;
    let legjobb = Number(sessionStorage.getItem("legjobb_pont")) || 0;
    if (pontszam > legjobb){
        sessionStorage.setItem("legjobb_pont", `${pontszam}`)

    }

    document.getElementById('restart').addEventListener("click",  () => {
        pontszam = 0;
        document.getElementById("pontszam").innerText = pontszam;
        location.reload();
    })
}
