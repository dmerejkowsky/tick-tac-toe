import { useState } from "react";
import { Board } from "./Board";


export default function Game() {
    const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [status, setStatus] = useState('First player: O')
    const [gameOver, setGameOver] = useState(false)
    const [currentMove, setCurrentMove] = useState(0)

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)

        if (gameOver) {
            return
        }
        setXIsNext(!xIsNext)

        const { winner, draw } = getGameStatus(nextSquares)
        if (winner) {
            setStatus(`Winner: ${winner}`)
            setGameOver(true)
        }
        else if (draw) {
            setStatus('Draw')
            setGameOver(true)
        }
        else {
            setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`)
        }
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
        setXIsNext(nextMove % 2 === 0)
    }
    const xIsNex = currentMove
    const currentSquares = history[currentMove]

    const moves = history.map((squares, move) => {
        let description
        if (move > 0) {
            description = `Go to move #${move}`
        } else {
            description = 'Go to start'
        }
        return (
            <li key={move}>
                <button
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                {status}
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// Returns { winner?: string, draw?: boolean, inProgress?: boolean }
export function getGameStatus(squares) {
    const winner = calculateWinner(squares)
    if (winner) {
        return { winner }
    }
    const occuppied = squares.filter(x => x != null).length
    const isDraw = occuppied === squares.length
    if (isDraw) {
        return { draw: true }
    }

    return { inProgress: true }
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
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}