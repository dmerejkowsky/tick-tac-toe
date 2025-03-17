export function Board({ xIsNext, squares, onPlay }) {
    function handleClick(index) {
        if (squares[index]) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[index] = xIsNext ? 'O' : 'X';
        onPlay(nextSquares);
    }

    function makeRow(index) {
        return <BoardRow key={index} squares={squares} rowNumber={index} onSquareClick={handleClick} />;
    }

    return <>
        {[0, 1, 2].map(makeRow)}
    </>;
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
