const Board = require('./board');
const validateInput = require('./input');
const shotField = require('./output');
const AutomaticOpponent = require('./automaticOpponent');

// const input = document.querySelector('#move');
const gameBoardHTML = document.getElementById("board");
const aoBoardHTML = document.getElementById("board2");

const fieldClicked = document.getElementsByClassName("board-field");


class AIGame {        
    constructor() {
        //Board for Player to set ships and AO shoot
        this.playerBoard = new Board();
        this.playerBoard.createRandomBoard();
        //Board for Player to shoot
        this.gameBoard = new Board();
        this.gameBoard.createRandomBoard();
        this.playerHitCounter = 0;
        this.aoHitCounter = 0;
        this.ao = new AutomaticOpponent();
    }

    aiPlayerGame() {
    console.log("AI  Game", this.playerBoard);
    console.log(fieldClicked.length);
    const test = (e) =>{
        let element = e.currentTarget;
        let id = element.getAttribute('id');
            console.log(id[0], id[1]);
            if (id[0] != null) {
                console.log()
                this.aiLoop(id);
            }
        }
    Array.from(fieldClicked).forEach(function (element) {
        element.addEventListener('click',  test, {once: true});
    });
    }

    aiLoop(id) {
        let coordinate = validateInput(id);
        console.log("coordinate:", coordinate.row, coordinate.col);
        let firedField = shotField(coordinate.row, coordinate.col);
        console.log("AiG test :", this.gameBoard.board);
        
            this.gameBoard.board[coordinate.row][coordinate.col].isHited = true;
            if (this.gameBoard.board[coordinate.row][coordinate.col].type === 'ship') {
                gameBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/ship.jpg");
                this.playerHitCounter++;
                this.isEndOfGame();    
            } else {
                gameBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/pudlo.jpg");
                this.aoMove();
            } 
        
    };

    aoMove() {
        let value = this.ao.randomShot();
        console.log(value);
        if (value) {
            let firedField = shotField(value.row, value.col);
            this.playerBoard.board[value.row][value.col].isHited = true;
            if (this.playerBoard.board[value.row][value.col].type === 'ship') {
                aoBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/ship.jpg");
                this.aoHitCounter++;
                this.isEndOfGame();
                this.aoMove();   
            } else {
                aoBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/pudlo.jpg");
    
            } 
        };
    }

    isEndOfGame() {
        if (this.playerHitCounter === 23 || this.aoHitCounter === 23) {
            this.gameBoard.showAllBoard();
            this.playerBoard.showAllBoard();
        }
    }

}

module.exports = AIGame;