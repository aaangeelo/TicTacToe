const ticTacToe = (playerOne, playerTwo) => {
  const board = Array.from(document.querySelectorAll(".board__cell"));
  const boardInputs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const results = document.getElementById("results").style;
  const resultsDisplay = document.querySelector(".results-display");

  let currentPlayer = playerOne;

  let winner;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoardClick = () => {
    board.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (winner) return;
        displayMove(e);
      });
    });
  };

  const displayMove = (e) => {
    //checks if cell has already been occupied
    if (e.target.textContent !== "") return;

    // updates the board
    e.target.textContent = currentPlayer.letter;
    boardInputs[e.target.id] = currentPlayer.letter;
    e.target.classList.add("board-occupied");

    // check for winner
    // prettier-ignore
    winningCombinations.forEach((combination) => {
      if (combination.every((cell) => boardInputs[cell] === currentPlayer.letter)) winner = currentPlayer;
    });

    //check for draw
    if (boardInputs.every((cell) => !isFinite(cell))) winner = "DRAW";

    if (winner === "DRAW") {
      results.display = "flex";
      resultsDisplay.textContent = "DRAW";
    } else if (winner) {
      results.display = "flex";
      resultsDisplay.textContent = `${winner.letter} PLAYER WON`;
      return;
    }

    // switch player
    if (currentPlayer === playerOne) currentPlayer = playerTwo;
    else if (currentPlayer === playerTwo) currentPlayer = playerOne;
  };

  // reset game
  const resetGame = () => {
    for (let i = 0; i < boardInputs.length; i++) {
      boardInputs[i] = i;
      board[i].textContent = "";
      board[i].classList.remove("board-occupied");
    }

    currentPlayer = playerOne;
    results.display = "none";
    resultsDisplay.textContent = "";
    winner = undefined;
  };

  return { handleBoardClick, resetGame, boardInputs };
};

const humanPlayer = (letter) => {
  return { letter };
};

const computerPlayer = () => {};

const init = (() => {
  let XPlayer = humanPlayer("X");
  let OPlayer = humanPlayer("O");

  const getPlayers = () => {
    const checked = document.querySelector("input[name=mode]:checked");
    if (checked.id === "player-player") OPlayer = humanPlayer("O");
    else if (checked.id === "player-computer") OPlayer = computerPlayer("O");

    board.resetGame();
  };

  document.querySelector(".btn-submit").addEventListener("click", getPlayers);

  const board = ticTacToe(XPlayer, OPlayer);
  board.handleBoardClick();

  return board;
})();
