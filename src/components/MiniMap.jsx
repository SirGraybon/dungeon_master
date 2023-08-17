import shareState from "../state/StateContext";
import "../styles/miniMap.css";
import React from "react";

const MiniMap = function () {
  const { cells, board_column, board_row } = shareState();

  const minimap = cells;
  return (
    <div className="minimapComponent">
      <div className="map">
      {cells.map((row, index) => {
        const rowIndex = index;
        return (
          <div className="minimapRow" key={rowIndex}>
              {row.map((column, index) => {
                const columnIndex = index;
                if (column.length > 1) {
                  if (rowIndex === board_row && columnIndex === board_column) {
                    return (
                      <div
                        className="minimapCellCurrent"
                        key={columnIndex}
                      ></div>
                    );
                  }

                  return (
                    <div
                      className="minimapCellExplored"
                      key={columnIndex}
                    ></div>
                  );
                } else {
                  return (
                    <div
                      className="minimapCellUnexplored"
                      key={columnIndex}
                    ></div>
                  );
                }
              })}
            </div>
        );
      })}
      </div>
    </div>
  );
};

export default MiniMap;
