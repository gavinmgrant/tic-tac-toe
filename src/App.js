import { useState, useEffect } from "react";
import Cell from "./components/Cell";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const EMPTY = ["", "", "", "", "", "", "", "", ""];

const App = () => {
  const { width, height } = useWindowSize();
  const [cells, setCells] = useState(EMPTY);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState(null);
  const [winningCombo, setWinningCombo] = useState(null);

  const message = "It's your turn " + go.toUpperCase() + ".";

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

    winningCombos.forEach((array, index) => {
      let winningIndex;
      let circleWins = array.every((cell) => {
        if (cells[cell].includes("circle")) winningIndex = index;
        return cells[cell].includes("circle");
      });

      if (circleWins) {
        setWinningCombo(winningCombos[winningIndex]);
        setWinningMessage("CIRCLE wins!");
        return;
      }
    });

    winningCombos.forEach((array, index) => {
      let winningIndex;
      let crossWins = array.every((cell) => {
        if (cells[cell].includes("cross")) winningIndex = index;
        return cells[cell].includes("cross");
      });

      if (crossWins) {
        setWinningCombo(winningCombos[winningIndex]);
        setWinningMessage("CROSS wins!");
        return;
      }
    });
  };

  useEffect(() => {
    checkScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells]);

  const startOver = () => {
    setCells(EMPTY);
    setGo("circle");
    setWinningMessage(null);
    setWinningCombo(null);
  };

  return (
    <div className="app">
      {winningMessage && winningMessage.includes("wins") && (
        <Confetti width={width} height={height} />
      )}
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
            winningCombo={winningCombo}
            setWinningMessage={setWinningMessage}
          />
        ))}
      </div>
      <div className="message">
        <p>{winningMessage || message}</p>
        <button
          className="button"
          onClick={startOver}
          disabled={!winningMessage}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default App;
