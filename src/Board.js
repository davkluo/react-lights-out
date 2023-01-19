import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { getRandomState } from './helpers/lights-out';

const CELL_NEIGHBOUR_OFFSETS = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0]
];

const DEFAULT_NROWS = 5;
const DEFAULT_NCOLS = 7;
const DEFAULT_CHANCE_LIGHT_STARTS_ON = 0.5;

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({
  nrows=DEFAULT_NROWS,
  ncols=DEFAULT_NCOLS,
  chanceLightStartsOn=DEFAULT_CHANCE_LIGHT_STARTS_ON
  }) {

  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from(
      {length: nrows},
      () => Array.from(
        {length: ncols},
        () => getRandomState(chanceLightStartsOn)
      )
    );
  }

  function hasWon() {
    return board.every(row => row.every(val => val === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it
      const cellsToFlip = [ [0, 0], ...CELL_NEIGHBOUR_OFFSETS ];
      for (let [yOffset, xOffset] of cellsToFlip) {
        flipCell(y + yOffset, x + xOffset, boardCopy);
      }

      // TODO: return the copy
      return boardCopy;
    });
  }

  return (
    <>
      <h1>Let's play Lights Out!</h1>
      { hasWon() && <p>You win!</p>}
      { !hasWon() &&
        <table>
          { board.map((row, y) =>
            <tr key={`r${y}`}>
              {row.map((val, x) =>
                <Cell
                  key={`${y}-${x}`}
                  isLit={board[y][x]}
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                />
              )}
            </tr>) }
        </table>
      }
    </>
  );
}

export default Board;
