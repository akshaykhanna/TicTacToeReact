import React from "react";
import "./style.css";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNextMoveX: true
    };
  }

  markWiners(a, b, c, squares) {
    squares[a] = "*";
    squares[b] = "*";
    squares[c] = "*";
  }

  calculateWinner(squares) {
    const winningPattrens = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winningPattrens.length; i++) {
      const [a, b, c] = winningPattrens[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        const winner = squares[a];
        this.markWiners(a, b, c, squares);
        return winner;
      }
    }
    return;
  }

  handleClick(i) {
    const currSquares = this.state.squares.slice();
    if (this.calculateWinner(currSquares) && !currSquares[i]) {
      return;
    }
    currSquares[i] = this.state.isNextMoveX ? "X" : "0";
    this.setState({
      squares: currSquares,
      isNextMoveX: !this.state.isNextMoveX
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onButtonClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    const status = winner
      ? "Player " + winner + " won"
      : "Next player: " + (this.state.isNextMoveX ? "X" : "0");
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
