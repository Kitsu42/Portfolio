import GameManager from "./game-manager.js";
import Square from "./square.js";

export default class Arena {
    constructor (){
        this._columns = GameManager.config.columns;
        this._lines = GameManager.config.lines;
        this._width = this._columns * GameManager.config.squareSize;
        this._height = this._lines * GameManager.config.squareSize;
        this.position = {
            top: (GameManager.config.height - this._height) / 2,
            left: (GameManager.config.width - this._width) / 2
        }
        this._squares = [...Array(this._columns)].map(()=>[...Array(this._lines)]);

        this._squares[0][0] = new Square ("#bb0000");
    }

    draw (){
        this._drawBorder()
        this._drawSquares()
        this._drawGrid()
    }
    _drawBorder(){
        GameManager.context.strokeStyle = "#000000";
        GameManager.context.strokeRect(
            this.position.left,
            this.position.top,
            this._width,
            this._height
        );        
    }
    _drawSquares(){
        for (let i = 0; i < this._columns; i++){
            for(let j = 0; j < this._lines; j++){
                if (this._squares[i][j]){
                    this._squares[i][j].draw(
                        this.position.left + i * GameManager.config.squareSize,
                        this.position.top + j * GameManager.config.squareSize);
                
                }
            } 
        }
    }

    _drawGrid(){
        GameManager.context.strokeStyle = "#00dede";
    
        for (let row = 0; row <= this._lines; row++) {
            let y = this.position.top + row * GameManager.config.squareSize;
            GameManager.context.beginPath();
            GameManager.context.moveTo(this.position.left, y);
            GameManager.context.lineTo(this.position.left + this._width, y);
            GameManager.context.stroke();
        }
    
        for (let col = 0; col <= this._columns; col++) {
            let x = this.position.left + col * GameManager.config.squareSize;
            GameManager.context.beginPath();
            GameManager.context.moveTo(x, this.position.top);
            GameManager.context.lineTo(x, this.position.top + this._height);
            GameManager.context.stroke();
        }
    }
    

}
