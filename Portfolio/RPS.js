document.querySelector('.button1').addEventListener('click', () => playGame('rock'));
document.querySelector('.button2').addEventListener('click', () => playGame('paper'));
document.querySelector('.button3').addEventListener('click', () => playGame('scissors'));

let playerMode = 'computer'; // Default mode
let currentPlayer = 'user1'; // Track current player for two-player mode

function setPlayerMode(mode) {
    playerMode = mode;
    resetGame();
}

function playGame(choice) {
    if (playerMode === 'computer') {
        playGameComputer(choice);
    } else {
        playGamePlayer(choice);
    }
}

function playGameComputer(userChoice) {
    const computerChoice = getComputerPick();
    const result = determineWinner(userChoice, computerChoice);

    document.getElementById("user1Pick").textContent = "User Pick: " + userChoice;
    document.getElementById("user2Pick").textContent = "Computer Pick: " + computerChoice;
    document.getElementById("resultText").textContent = "Result: " + result;
}

function playGamePlayer(userChoice) {
    if (currentPlayer === 'user1') {
        document.getElementById("user1Pick").textContent = "User 1 Pick: " + userChoice;
        currentPlayer = 'user2';
    } else {
        document.getElementById("user2Pick").textContent = "User 2 Pick: " + userChoice;
        const user1Choice = document.getElementById("user1Pick").textContent.split(": ")[1];
        const result = determineWinner(user1Choice, userChoice);
        document.getElementById("resultText").textContent = "Result: " + result;
        currentPlayer = 'user1';
    }
}

function getComputerPick() {
    const choices = ['rock', 'paper', 'scissors'];
    const random = Math.floor(Math.random() * choices.length);
    return choices[random];
}

function determineWinner(user, computer) {
    if (user === computer) {
        return "It's a tie!";
    } else if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')
    ) {
        return 'User wins!';
    } else {
        return 'Computer wins!';
    }
}

function resetGame() {
    document.getElementById("user1Pick").textContent = "";
    document.getElementById("user2Pick").textContent = "";
    document.getElementById("resultText").textContent = "";
    currentPlayer = 'user1';
}

/* Tic Tac Toe Logic */
let ticTacToeMode = 'computer';
let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttCurrentPlayer = 'X';
let tttGameOver = false;

function setTicTacToeMode(mode) {
    ticTacToeMode = mode;
    resetTicTacToe();
}

document.querySelectorAll('.ttt-cell').forEach(cell => {
    cell.addEventListener('click', () => makeMove(cell.dataset.index));
});

function makeMove(index) {
    if (tttBoard[index] === '' && !tttGameOver) {
        tttBoard[index] = tttCurrentPlayer;
        updateBoard();
        if (checkWinner()) {
            document.getElementById("ttt-resultText").textContent = tttCurrentPlayer + " wins!";
            tttGameOver = true;
        } else if (tttBoard.every(cell => cell !== '')) {
            document.getElementById("ttt-resultText").textContent = "It's a tie!";
            tttGameOver = true;
        } else {
            tttCurrentPlayer = tttCurrentPlayer === 'X' ? 'O' : 'X';
            if (ticTacToeMode === 'computer' && tttCurrentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function computerMove() {
    let availableCells = tttBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let move = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(move);
}

function updateBoard() {
    document.querySelectorAll('.ttt-cell').forEach((cell, index) => {
        cell.textContent = tttBoard[index];
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return tttBoard[index] === tttCurrentPlayer;
        });
    });
}

function resetTicTacToe() {
    tttBoard = ['', '', '', '', '', '', '', '', ''];
    tttCurrentPlayer = 'X';
    tttGameOver = false;
    document.getElementById("ttt-resultText").textContent = "";
    updateBoard();
}
