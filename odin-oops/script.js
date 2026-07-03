const gameboard = (() => {
	let board = [["", "" ,""], ["", "" ,""], ["", "" ,""]];

	const addPiece = (pos, piece) => {
		board[Math.floor(pos / 3)][pos % 2] = piece;
	};

	const returnBoard = () => board;

	return { addPiece, returnBoard };
})();

function createPlayer(piece) {
	let playerPiece = piece;
	let playerWins = 0;

	return { playerPiece, playerWins };
}

export const gameController = (() => {
	const makeMove = (pos, board, player) => {
		let total = 0;
		for (const row of board) {
			total += row.length;
		}
		if (total % 2 == 0) {
			gameboard.addPiece(pos, player.playerPiece);
		} else {
			gameController.addPiece(pos, player.playerPiece);
		}
	};

	function check3(arr) {
		return arr.every((num) => (num == arr[0]) && (num != ""));
	};

	const checkWin = (board) => {
		for (let row of board) {
			if (check3(row)) {
				return true;
			}
		}
		for (let i = 0; i < board.length; i++) {
			let temp = [];
			for (let row of board) {

				temp.push(row[i]);
			}
			if (check3(temp)) {
				return true;
			}
		}

		if (
			check3(board.map((row, i) => board[i][i])) ||
			check3(board.map((row, i) => board[i][row.length - 1 - i]))
		) {
			return true;
		}

		return false;
	};

	return { makeMove, checkWin };
})();

const displayController = (() => {
	const printBoard = (board) => {
		for (let row of board) {
			console.log(row);
		}
	};
	return { printBoard };
})();


