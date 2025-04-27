export class Alakzat{
    /**
        mátrix[true, false]


     */
    constructor(space) {
        this.Space = [];
        for(let bY = 0; bY < space.length; bY++){
            this.Space.push([]);
            for(let bX = 0; bX < space[bY].length; bX++){
                this.Space[bY].push(new Blokk(space[bY][bX]));
            }
        }
        
        this.Offset = {X: 0, Y: 0};

    }

    HolFog(offsetX, offsetY){
        for(let bY = 0; bY < this.Space.length; bY++){
            for(let bX = 0; bX< this.Space[bY].length; bX++){
                if(this.Space[bY][bX].Bool == true){
                    if(this.Space[bY][bX].X <= offsetX && this.Space[bY][bX].X  + 70 >= offsetX &&
                        this.Space[bY][bX].Y <= offsetY && this.Space[bY][bX].Y + 70 >= offsetY){
                            let CoorOffset = {X: bX, Y: bY};
                            return CoorOffset;
                    }
                }
            }
        }
        // console.log(this.Space[0][0].X)
        return null;
    }

    Rajz(x, y, ctx){
        for (let bY = 0; bY< this.Space.length; bY++){
            for (let bX = 0; bX < this.Space[bY].length; bX++){
                if (this.Space[bY][bX].Bool == true){
                    ctx.fillRect( x + bX*70, y + bY * 70, 70, 70);
                    this.Space[bY][bX].X = x + bX *70;
                    this.Space[bY][bX].Y = y + bY * 70;
                }
                else{
                    this.Space[bY][bX].X = x + bX *70;
                    this.Space[bY][bX].Y = y + bY * 70;
                }
            }
        
        }
        // console.log(this.Space[0][0].X)
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