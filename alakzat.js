export class Alakzat{
    /**
        mátrix[true, false]


     */
    constructor() {
        this.Space;
        this.Offset = {X: 0, Y: 0};
    }

    HolFog(offsetX, offsetY){
        for(let bY = 0; bY < this.Space.length; bY++){
            for(let bX = 0; bX< this.Space[bY].length; bX++){
                if(this.Space[bY][bX].Bool == true){
                    if(this.Space[bY][bX].X < offsetX && this.Space[bY][bX].X  + 70 > offsetX &&
                        this.Space[bY][bX].Y < offsetY && this.Space[bY][bX].Y + 70 > offsetY){
                            let CoorOffset = {X: bX, Y: bY};
                            return CoorOffset;
                    }
                }
            }
        }
        return null;
    }
}

export class Blokk{
    /**
     *
     */
    constructor(bool) {
        this.Bool = bool;
        this.X;
        this.Y;
    }
}