import { useState, useEffect } from "react";

const Cell = ({
  id,
  cell,
  setCells,
  go,
  setGo,
  cells,
  winningMessage,
  winningCombo,
  setWinningMessage,
}) => {
  const [losing, setLosing] = useState("");

  const handleClick = (e) => {
    // if there is a winning message, the game is over
    if (winningMessage || !e.target.firstChild) return;

    const taken =
      e.target.firstChild.classList.contains("circle") ||
      e.target.firstChild.classList.contains("cross");

    if (!taken) {
      if (go === "circle") {
        e.target.firstChild.classList.add("circle");
        handleCellChange("circle");
        setGo("cross");
      }
      if (go === "cross") {
        e.target.firstChild.classList.add("cross");
        handleCellChange("cross");
        setGo("circle");
      }
    }
  };

  const handleCellChange = (className) => {
    const nextCells = cells.map((cell, index) => {
      if (index === id) {
        // index of the array is the same id of the selected cell, update className
        return className;
      } else {
        // else return the same cell in the previous array
        return cell;
      }
    });
    setCells(nextCells);
  };

  useEffect(() => {
    if (winningCombo) {
      if (!winningCombo.includes(id)) {
        setLosing(" losing");
      }
    }
    if (!winningCombo) setLosing("");
  }, [id, winningCombo]);

  useEffect(() => {
    if (!winningCombo) {
      const areAllCellsFilled = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === "") {
            return false;
          }
        }
        return true;
      };
      const allCellsFilled = areAllCellsFilled(cells);
      if (allCellsFilled) setWinningMessage("Tie game!");
    }
  }, [cells, setGo, setWinningMessage, winningCombo]);

  return (
    <div className="square" id={id} onClick={handleClick}>
      <div className={cell + losing} onClick={() => null}></div>
    </div>
  );
};

export default Cell;
