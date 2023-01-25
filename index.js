const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [1, 4, 8],
    [2, 4, 6]
];

let options;
let running = false;
let currentPlayer;
restartBtn.addEventListener("click", intializeGame);

intializeGame();

function intializeGame(){
    cells.forEach(cell => cell.textContent = "")
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    let cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] == "" && running){
        updateCell(this, cellIndex);
        checkWinner();
    }

}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWin = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "" ){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWin = true;
            break;
        }
    }

    if(roundWin){
        statusText.textContent = `${currentPlayer} wins!`
    } else if(!options.includes("")){
        statusText.textContent = `Draw!`
    } else{
        changePlayer();
    }
}