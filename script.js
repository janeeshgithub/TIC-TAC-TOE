const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;

restartButton.addEventListener('click', startGame);

function startGame() {
  gameActive = true;
  currentPlayer = 'X';
  status.innerText = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.innerText !== '') return;

  cell.innerText = currentPlayer;
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return cells[a].innerText !== '' &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText;
  });
}

function isDraw() {
  return [...cells].every(cell => cell.innerText !== '');
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    status.innerText = "It's a draw!";
  } else {
    status.innerText = `Player ${currentPlayer} wins!`;
  }
}
