import shareState from "../state/StateContext";
import "../styles/miniMap.css"
import React from "react";

const MiniMap = function () {
  const { data } = shareState();
  const minimap = data.cellDATA;
  return (
    <div className="minimapComponent">
      {minimap.map((row, index) => {
        return (
          <div className="minimapRow">
            {row.map((column) => {
              if(column.length > 1){

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
