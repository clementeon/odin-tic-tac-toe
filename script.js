const gameboard = (() => {
	let board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	let gamesPlayed = 1;

	const addGame = () => {
		gamesPlayed++;
	};

	const returnGames = () => {
		return gamesPlayed;
	};
	const addPiece = (pos, piece) => {
		board[Math.floor(pos / 3)][pos % 3] = piece;
	};

	const returnPos = (pos) => {
		return board[Math.floor(pos / 3)][pos % 3];
	};

	const returnBoard = () => board;

	const clearBoard = () => {
		for (const row of board) {
			for (let i = 0; i < row.length; i++) {
				row[i] = "";
			}
		}
	};

	return {
		addGame,
		returnGames,
		addPiece,
		returnBoard,
		clearBoard,
		returnPos,
	};
})();

function createPlayer(piece, colour) {
	let playerPiece = piece;
	let playerWins = 0;
	let playerColour = colour;
	const addWin = () => {
		playerWins++;
	};

	const numWins = () => {
		return playerWins;
	};

	const playPiece = () => {
		return playerPiece;
	};
	return { numWins, addWin, playPiece, playerColour };
}

const gameController = (() => {
	function check3(arr) {
		const first = gameboard.returnPos(arr[0]);

		if (first === "") return false;

		return arr.every((index) => gameboard.returnPos(index) === first);
	}

	const checkWin = (board) => {
		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],

			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],

			[0, 4, 8],
			[2, 4, 6],
		];

		for (const line of winningLines) {
			if (check3(line, board)) {
				return line;
			}
		}

		return false;
	};

	const checkDraw = (board) => {
		return board.every((row) => {
			return row.every((num) => num != "");
		});
	};
	return { check3, checkWin, checkDraw };
})();

const displayController = (() => {
	const cells = document.querySelectorAll(".cell");
	const playerX = createPlayer("X");
	const playerO = createPlayer("O");
	const gameCount = document.getElementById("total-games");
	let current = playerX;
	const next = document.getElementById("next");
	const winner = document.getElementById("winner");

	const disableCells = () => {
		cells.forEach((cell) => {
			cell.disabled = true;
		});
	};

	const enableCells = () => {
		cells.forEach((cell) => {
			cell.disabled = false;
		});
	};

	cells.forEach((cell, index) => {
		cell.addEventListener("click", () => {
			if (gameboard.returnPos(index) == "") {
				gameboard.addPiece(index, current.playPiece());

				cell.innerHTML = current.playPiece();
				cell.classList.add(current.playPiece().toLowerCase());

				let temp = gameController.checkWin(gameboard.returnBoard());
				if (temp) {
					winner.innerText = `${current.playPiece()} Wins`;
					current.addWin();

					const playerDisplay = document.getElementById(
						current.playPiece(),
					);
					const winsDisplay = playerDisplay.querySelector(".wins");
					winsDisplay.innerText = `Wins: ${current.numWins()}`;

					next.style.display = "flex";
					disableCells();
				} else if (gameController.checkDraw(gameboard.returnBoard())) {
					winner.innerText = "Draw";
					next.style.display = "flex";
					disableCells();
				}

				if (current == playerX) {
					current = playerO;
				} else {
					current = playerX;
				}
				cell.disabled = true;
			}
		});
		cell.addEventListener("mouseover", ()=> {
			 
		})
	}		
);

	const cleanBoard = () => {
		gameboard.clearBoard();
		cells.forEach((cell, index) => {
			cell.innerHTML = "";
			cell.classList.remove("x", "o");
		});
		enableCells();
	};

	document.getElementById("next-button").addEventListener("click", () => {
		gameboard.addGame();
		gameCount.innerText = `Game ${gameboard.returnGames()}`;
		next.style.display = "none";
		if (gameboard.returnGames() % 2 == 1) {
			current = playerX;
		} else {
			current = playerO;
		}
		cleanBoard();
	});

	document.getElementById("restart").addEventListener("click", () => {
		cleanBoard();
	});

	return { cells, current, playerO, playerX };
})();
