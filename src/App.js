import { useState } from "react"

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [status, setStatus] = useState('First player: O')
    const [gameOver, setGameOver] = useState(false)

    function handlePlay(nextSquares) {
        if (gameOver) {
            return
        }
        setXIsNext(!xIsNext)
        const nextHistory = [...history, nextSquares]
        setHistory(nextHistory)

        const winner = calculateWinner(nextSquares)
        const occuppied = nextSquares.filter(x => x != null).length

        if (winner) {
            setStatus(`Winner: ${winner}`)
            setGameOver(true)
        }
        else if (occuppied === nextSquares.length) {
            setStatus('Draw')
            setGameOver(true)
        }
        else {
            setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`)
        }
    }

    const currentSquares = history[history.length - 1];

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                {status}
            </div>
            <div className="game-info">
                <ol>{/*TODO*/}</ol>
            </div>
        </div>
    );
}

export function Board({ xIsNext, squares, onPlay }) {
    function handleClick(index) {
        if (squares[index]) {
            return
        }

        const nextSquares = squares.slice()
        nextSquares[index] = xIsNext ? 'O' : 'X'
        onPlay(nextSquares)
    }

    function makeRow(index) {
        return <BoardRow squares={squares} rowNumber={index} onSquareClick={handleClick} />
    }

    return <>
        {[0, 1, 2].map(makeRow)}
    </>
}

function BoardRow({ squares, rowNumber, onSquareClick }) {
    const start = rowNumber * 3
    const [x, y, z] = [start, start + 1, start + 2]
    return <>
        <div className="board-row">
            <Square value={squares[x]} onSquareClick={() => onSquareClick(x)} />
            <Square value={squares[y]} onSquareClick={() => onSquareClick(y)} />
            <Square value={squares[z]} onSquareClick={() => onSquareClick(z)} />
        </div>
    </>
}

function Square({ value, onSquareClick }) {
    return <
        button
        className="square"
        onClick={onSquareClick}
    >
        {value}
    </button>
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
