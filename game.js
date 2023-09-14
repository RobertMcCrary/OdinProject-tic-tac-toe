//module that is responsible for rendering the board
const Gameboard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        })
    }

    const update = (index, value) => {
        gameBoard[index] = value;
        render();
    };

    const getGameBoard = () => gameBoard;

    return {
        render,
        update,
        getGameBoard
    }
})();


const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}


//game logic is handled here
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            {name: createPlayer(document.querySelector("#player1").value), mark: "X"},
            {name: createPlayer(document.querySelector("#player2").value), mark: "O"}
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        
        if (Gameboard.getGameBoard()[index] !== "") {
            return;
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return {
        start,
        handleClick
    }
})();

//when the start buttun is clicked the start function in the game module is called
//the start function in the game module contains the render function that renders the game board
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
});