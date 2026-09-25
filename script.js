const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restartButton");
const resetButton = document.getElementById("resetButton");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const scoreDrawElement = document.getElementById("scoreDraw");


let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;


const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// Cell Click
function handleCellClick(event) {

    const clickedCell = event.currentTarget;

    const clickedIndex = Number(
        clickedCell.getAttribute("data-index")
    );


    // Don't allow clicking occupied cells
    if (board[clickedIndex] !== "") {
        return;
    }


    // Don't allow moves after game ends
    if (!gameActive) {
        return;
    }


    // Put X or O in the board
    board[clickedIndex] = currentPlayer;

    clickedCell.textContent = currentPlayer;


    // Check result
    checkGameResult();

}


// Check Game Result
function checkGameResult() {

    let roundWon = false;


    for (let combination of winningCombinations) {

        const first = combination[0];
        const second = combination[1];
        const third = combination[2];


        if (
            board[first] !== "" &&
            board[first] === board[second] &&
            board[first] === board[third]
        ) {

            roundWon = true;

            break;

        }

    }


    // Player won
    if (roundWon) {

        statusText.textContent =
            `Player ${currentPlayer} Wins! 🎉`;

        gameActive = false;


        if (currentPlayer === "X") {

            scoreX++;

            scoreXElement.textContent = scoreX;

        } else {

            scoreO++;

            scoreOElement.textContent = scoreO;

        }

        return;

    }


    // Draw
    if (!board.includes("")) {

        statusText.textContent =
            "It's a Draw! 🤝";

        scoreDraw++;

        scoreDrawElement.textContent = scoreDraw;

        gameActive = false;

        return;

    }


    // Change player
    currentPlayer =
        currentPlayer === "X" ? "O" : "X";


    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;

}


// Restart Round
function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;


    statusText.textContent =
        "Player X's Turn";


    cells.forEach(cell => {

        cell.textContent = "";

    });

}


// Reset Score
function resetScore() {

    scoreX = 0;

    scoreO = 0;

    scoreDraw = 0;


    scoreXElement.textContent = "0";

    scoreOElement.textContent = "0";

    scoreDrawElement.textContent = "0";


    restartGame();

}


// Add click event ONLY ONCE
cells.forEach(cell => {

    cell.addEventListener(
        "click",
        handleCellClick
    );

});


// Restart button
restartButton.addEventListener(
    "click",
    restartGame
);


// Reset button
resetButton.addEventListener(
    "click",
    resetScore
);
