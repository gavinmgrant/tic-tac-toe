import { useState, useEffect } from "react";
import Cell from "./components/Cell";

const EMPTY = ["", "", "", "", "", "", "", "", ""];

const App = () => {
  const [cells, setCells] = useState(EMPTY);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState(null);

  const message = "It is now " + go + "'s turn.";

  const checkScore = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombos.forEach((array) => {
      let circleWins = array.every((cell) => cells[cell] === "circle");

      if (circleWins) {
        setWinningMessage("Circle wins!");
        return;
      }
    });

    winningCombos.forEach((array) => {
      let crossWins = array.every((cell) => cells[cell] === "cross");

      if (crossWins) {
        setWinningMessage("Cross wins!");
        return;
      }
    });

    const areAllCellsFilled = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") {
          return false;
        }
      }
      return true;
    };

    if (areAllCellsFilled(cells)) {
      setWinningMessage("Tie game!");
    }
  };

  useEffect(() => {
    checkScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells]);

  const startOver = () => {
    setCells(EMPTY);
    setGo("circle");
    setWinningMessage("");
  };

  return (
    <div className="app">
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            setCells={setCells}
            go={go}
            setGo={setGo}
            cells={cells}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <p>{winningMessage || message}</p>
      <button onClick={startOver} disabled={!winningMessage}>
        Start Over
      </button>
    </div>
  );
};

export default App;
