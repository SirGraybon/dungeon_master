import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import "../styles/playerDetails.css";
import shareState from "../state/StateContext";
import Inventory from "./Inventory";
import Equipment from "./Equipment";

const PlayerDetails = function (props) {
  const [sideView, setSideview] = useState("inventory");
  const { selectedPlayer } = shareState();

  const handleClick = function(input) {
    setSideview(input)
  }

  return (
    <div className="playerModal">
      <div className="playerDetails">
        <div className="playerDetailsSection">
          <img className="avatar" src={selectedPlayer.avatar} alt="" />
          <div>{selectedPlayer.characterName}</div>
          <div>
            Level {selectedPlayer.level} {selectedPlayer.class}
          </div>
          <div>
            {selectedPlayer.current_health} / {selectedPlayer.max_health} HP
          </div>
          <div>Gold: {selectedPlayer.gold}</div>
        </div>
        <div className="playerDetailsSection">
          <p> Dex: {selectedPlayer.stats.Dex} </p>
          <p> Str: {selectedPlayer.stats.Str} </p>
          <p> Con: {selectedPlayer.stats.Con} </p>
          <p> Int: {selectedPlayer.stats.Int} </p>
          <p> Chr: {selectedPlayer.stats.Chr} </p>
          <p> Wis: {selectedPlayer.stats.Wis} </p>
        </div>
        {sideView === "inventory" && <Inventory />}
        {sideView === "equipment" && <Equipment />}
        <div className="tabs">
          <button onClick={() => handleClick("inventory")}>Inv</button>
          <button onClick={() => handleClick("equipment")}>Eqp</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
