import shareState from "../state/StateContext";
import "../styles/miniMap.css";
import React from "react";

const MiniMap = function () {
  const { data, board_column, board_row } = shareState();
  const minimap = data.cellDATA;
  return (
    <div className="minimapComponent">
      {minimap.map((row, index) => {
        const rowIndex = index
        return (
          <div className="minimapRow">
            {row.map((column, index) => {
              const columnIndex = index
              if (column.length > 1) {
                if (rowIndex === board_row && columnIndex === board_column) {
                  return <div className="minimapCellCurrent"></div>;
                }

                return <div className="minimapCellExplored"></div>;
              } else {
                return <div className="minimapCellUnexplored"></div>;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MiniMap;
