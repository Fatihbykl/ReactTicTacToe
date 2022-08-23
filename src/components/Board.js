import Square from "./Square";
import React, { useState } from 'react';

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [next, setNext] = useState("X");
    const [winner, setWinner] = useState("");

    const onClickSquare = (i) => {
        if(next === null) { return; }
        if(squares[i] != null) { return; }
        let s = squares.slice();
        s[i] = next;
        setSquares(s);

        if (checkWin(s)) {
            setWinner("Winner: " + next);
            setNext(null);
        }
        else {
            const isFull = s.every(cell => cell !== null)
            if (isFull) {
                setWinner("Draw!");
                setNext(null);
            }
            changeNext();
        }
    }

    const changeNext = () => {
        if(next === "X") { setNext("O"); }
        else { setNext("X"); }
    }

    const showSquare = (i) => {
        return (
            <Square value={squares[i]} onClick={() => onClickSquare(i)} />
        )
    }

    const checkWin = (squares) => {
        for (let i = 0; i < 9; i += 3) {
            if (squares[i] === squares[i + 1] && squares[i] === squares[i + 2] && squares[i] !== null) {
                return true;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (squares[i] === squares[i + 3] && squares[i] === squares[i + 6] && squares[i] !== null) {
                return true;
            }
        }
        if (squares[0] === squares[4] && squares[0] === squares[8] && squares[0] !== null) {
            return true;
        }
        if (squares[2] === squares[4] && squares[2] === squares[6] && squares[2] !== null) {
            return true;
        }
    }

    return (
        <div className="board" >
            <div>
                {showSquare(0)}
                {showSquare(1)}
                {showSquare(2)}
            </div>
            <div>
                {showSquare(3)}
                {showSquare(4)}
                {showSquare(5)}
            </div>
            <div>
                {showSquare(6)}
                {showSquare(7)}
                {showSquare(8)}
            </div>
            <div>{winner}</div>
        </div>
    );
}

export default Board;