import { gameController } from "./script.js";

const totalBoard = [
  // X wins top row
  [
    ["X", "X", "X"],
    ["O", "", "O"],
    ["", "", ""],
  ],

  // O wins middle row
  [
    ["X", "X", ""],
    ["O", "O", "O"],
    ["X", "", ""],
  ],

  // X wins bottom row
  [
    ["O", "", "O"],
    ["", "O", ""],
    ["X", "X", "X"],
  ],

  // X wins left column
  [
    ["X", "O", "O"],
    ["X", "", ""],
    ["X", "O", ""],
  ],

  // O wins middle column
  [
    ["X", "O", "X"],
    ["", "O", ""],
    ["X", "O", ""],
  ],

  // X wins right column
  [
    ["O", "", "X"],
    ["O", "", "X"],
    ["", "O", "X"],
  ],

  // X wins main diagonal
  [
    ["X", "O", "O"],
    ["", "X", ""],
    ["O", "", "X"],
  ],

  // O wins anti-diagonal
  [
    ["X", "", "O"],
    ["X", "O", ""],
    ["O", "", "X"],
  ],

  // Draw, no winner
  [
    ["X", "O", "X"],
    ["X", "O", "O"],
    ["O", "X", "X"],
  ],

  // Game still in progress
  [
    ["X", "O", ""],
    ["", "X", "O"],
    ["O", "", ""],
  ],

  // One move from X winning
  [
    ["X", "X", ""],
    ["O", "O", ""],
    ["", "", ""],
  ],

  // One move from O winning diagonally
  [
    ["O", "X", "X"],
    ["", "O", ""],
    ["X", "", ""],
  ],

  // Full board with X winning
  [
    ["X", "O", "O"],
    ["O", "X", "O"],
    ["O", "X", "X"],
  ],

  // Full board with O winning
  [
    ["O", "X", "O"],
    ["X", "O", "X"],
    ["O", "X", "X"],
  ],
];

totalBoard.forEach((board, index) => {
  console.log(`Board ${index + 1}:`, gameController.checkWin(board));
});