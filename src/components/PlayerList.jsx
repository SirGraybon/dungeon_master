import shareState from "../state/StateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/playerList.css";
import { motion } from "framer-motion";

export default function PlayerList() {
  const { players, setDisplay, handleDrag } = shareState();

  return (
    <div className="source">
      {players.map((player, index) => {
        return (
          <div className="playerCard" key={player.characterName}>
            <div className="tokenArea" style={{backgroundImage: `url(${player.avatar})`}} key={player.characterName}>
              <motion.img
                whileHover={{ scale: 1.2 }}
                whileDrag={{ borderRadius: 25}}
                dragSnapToOrigin
                src={player.avatar}
                className={player.class}
                drag
                onDragEnd={handleDrag}
              ></motion.img>
            </div>

            <div
              className="infoArea"
              onClick={() => setDisplay("player", player)}
            >
              <div className="playerInfo">
                <p className="playerName">{player.characterName}</p>
                <p>{player.class}</p>
              </div>
              <div className="playerStatus">
                <h4>
                  {player.current_health} / {player.max_health}
                </h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
