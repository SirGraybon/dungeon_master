import shareState from "../state/StateContext";
import "../styles/miniMap.css"
import React from "react";

const MiniMap = function () {
  const { data } = shareState();
  const minimap = data.cellDATA;
  return (
    <div className="minimapRow">
      {minimap.map((row, index) => {
        return (
          <div className="minimapCell">
            {row.map((column) => {
              return <div className="minimapCell"></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MiniMap;
