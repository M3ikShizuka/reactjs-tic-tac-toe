import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//       return (
//         <button 
//             className="square" 
//             onClick={() => {this.props.onClick()}}
//             >
//             {this.props.value}
//         </button>
//       );
//     }
//   }
  
    function Square(props) {
        return (
            <button
                className="square"
                onClick={props.onClick}
            >
                {props.value}
            </button>
        );
    }

  class Board extends React.Component {
    renderSquare(i) {
      return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
      );
    }
  
    render() {
      return (
        <div>
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
  
  class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                    {
                    squares: Array(9).fill(null),
                    isGameOver: false,
                }
            ],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentHistory = history[history.length - 1];
        const squares = currentHistory.squares.slice();

        if (
            currentHistory.isGameOver || 
            squares[i]
        ) {
            return;
        }

        squares[i] = this.state.xIsNext? 'Ｘ' : 'Ｏ';
        this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            }
        );
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
            "Go to move #" + move :
            "Beginning of the game";

            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status = null;

        if (winner) {
            status = 'Winner ' + winner;
            current.isGameOver = true;
        }
        else if (this.state.stepNumber >= 9) {
            status = 'Round draw';
            current.isGameOver = true;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'Ｘ' : 'Ｏ');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
             />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let index = 0; index < lines.length; index++) {
          const [a, b, c] = lines[index];
          
          if (
            squares[a] && 
            squares[a] === squares[b] && 
            squares[a] === squares[c]
            ) {
              return squares[a];
          }
      }

      return null;
  }