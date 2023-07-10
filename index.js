// Initialize the board
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Add event listeners to buttons
for (let i = 1; i <= 9; i++) {
  document.getElementById("b" + i).addEventListener("click", function () {
    if (this.value === "") {
      this.value = "X";
      this.disabled = true;
      let index = parseInt(this.id.slice(1)) - 1;
      board[index] = "X";

      if (checkWin("X")) {
        document.getElementById("print").innerHTML = "Player X won";
        disableAllButtons();
        return;
      }

      if (!boardIsFull()) {
        makeComputerMove();
        if (checkWin("O")) {
          document.getElementById("print").innerHTML = "Player O won";
          disableAllButtons();
        }
      } else {
        document.getElementById("print").innerHTML = "It's a tie";
      }
    }
  });
}


function disableAllButtons() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById("b" + i).disabled = true;
  }
}

// Check if a player has won
function checkWin(player) {
  for (let combination of winningCombinations) {
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      return true;
    }
  }
  return false;
}

// Check if the board is full
function boardIsFull() {
  return !board.includes("");
}

// Make the computer's move
function makeComputerMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  board[bestMove] = "O";
  document.getElementById("b" + (bestMove + 1)).value = "O";
  document.getElementById("b" + (bestMove + 1)).disabled = true;
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
  if (checkWin("X")) {
    return -1;
  } else if (checkWin("O")) {
    return 1;
  } else if (boardIsFull()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
    }
  }
  return bestScore;
} else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
    board[i] = "X";
    let score = minimax(board, depth + 1, true);
    board[i] = "";
    bestScore = Math.min(score, bestScore);
    }
    }
    return bestScore;
    }
    }
// Function to reset the game board
  function resetBoard() {
    // Clear the input values of all cells
    document.querySelectorAll('.cell').forEach(function(cell) {
      cell.value = '';
      cell.disabled = false;
      cell.style.color = '';
    });
  
    // Clear the game status message
    document.getElementById('print').innerHTML = '';
  }
  
  // Function to handle the reset button click event
  function myfunc_2() {
    resetBoard();
  }
  

    