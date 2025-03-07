document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const modeButtons = document.querySelectorAll('input[name="mode"]');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;
    let playMode = 'multiplayer';
  
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
  
    function handleCellClick(e) {
      const cell = e.target;
      const cellIndex = Array.from(cells).indexOf(cell);
  
      if (board[cellIndex] !== null || !gameActive) {
        return;
      }
  
      makeMove(cellIndex, currentPlayer);
      if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
        return;
      } else if (board.every(cell => cell !== null)) {
        alert('Draw!');
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (playMode === 'computer' && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
      }
    }
  
    function makeMove(index, player) {
      board[index] = player;
      cells[index].textContent = player;
    }
  
    function checkWin() {
      return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
      });
    }
  
    function resetGame() {
      board.fill(null);
      cells.forEach(cell => (cell.textContent = ''));
      currentPlayer = 'X';
      gameActive = true;
      if (playMode === 'computer' && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
      }
    }
  
    function computerMove() {
      if (!gameActive) return;
  
      
      const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
      
     


      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === 'O' && board[b] === 'O' && board[c] === null) {
          makeMove(c, 'O');
          if (checkWin()) {
            alert(`Computer wins!`);
            gameActive = false;
          }
          currentPlayer = 'X';
          return;
        }
        if (board[a] === 'O' && board[c] === 'O' && board[b] === null) {
          makeMove(b, 'O');
          if (checkWin()) {
            alert(`Computer wins!`);
            gameActive = false;
          }
          currentPlayer = 'X';
          return;
        }
        if (board[b] === 'O' && board[c] === 'O' && board[a] === null) {
          makeMove(a, 'O');
          if (checkWin()) {
            alert(`Computer wins!`);
            gameActive = false;
          }
          currentPlayer = 'X';
          return;
        }
      }
  
      





      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === 'X' && board[b] === 'X' && board[c] === null) {
          makeMove(c, 'O');
          if (checkWin()) {
            alert(`Computer wins!`);
            gameActive = false;
          }
          currentPlayer = 'X';
          return;
        }
        if (board[a] === 'X' && board[c] === 'X' && board[b] === null) {
          makeMove(b, 'O');
          if (checkWin()) {
            alert(`Computer wins!`);
            gameActive = false;
          }
          currentPlayer = 'X';
          return;
        }
        if (board[b] === 'X' && board[c] === 'X' && board[a] === null) {
          makeMove(a, 'O');
          if (checkWin()) {
            alert(`Computer wins!`);
            gameActive = false;
          }
          currentPlayer = 'X';
          return;
        }
      }
  
      
















      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      makeMove(randomIndex, 'O');
      if (checkWin()) {
        alert(`Computer wins!`);
        gameActive = false;
      } else if (board.every(cell => cell !== null)) {
        alert('Draw!');
        gameActive = false;
      }
      currentPlayer = 'X';
    }
  



    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    modeButtons.forEach(button => button.addEventListener('change', (e) => {
      playMode = e.target.value;
      resetGame();
    }));
  
    






    window.addEventListener('beforeunload', () => {
      localStorage.setItem('ticTacToeBoard', JSON.stringify(board));
      localStorage.setItem('ticTacToePlayer', currentPlayer);
      localStorage.setItem('ticTacToeMode', playMode);
    });
  
    window.addEventListener('load', () => {
      const savedBoard = JSON.parse(localStorage.getItem('ticTacToeBoard'));
      const savedPlayer = localStorage.getItem('ticTacToePlayer');
      const savedMode = localStorage.getItem('ticTacToeMode');
      if (savedBoard && savedPlayer && savedMode) {
        board = savedBoard;
        currentPlayer = savedPlayer;
        playMode = savedMode;
        cells.forEach((cell, index) => {
          cell.textContent = board[index];
        });
        if (playMode === 'computer' && currentPlayer === 'O') {
          setTimeout(computerMove, 500);
        }
      }
    });
  });
  
