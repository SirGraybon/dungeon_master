import shareState from "../state/StateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/playerList.css";
import { motion } from "framer-motion";

export default function PlayerList() {
  const { players, setDisplay } = shareState();

  return (
    <div className="source">
      {players.map((player, index) => {
        return (
          <div className="playerCard" key={player.characterName}>
            <Droppable
              key={player.name}
              droppableId="source"
              type="cell"
              isDropDisabled={true}
            >
              {(provided) => (
                <div
                  className="tokenArea"
                  key={player.characterName}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Draggable
                    key={player.characterName}
                    draggableId={player.characterName}
                    index={index}
                  >
                    {(provided) => (
                      <motion.img
                        whileHover={{ scale: 1.2 }}
                        dragSnapToOrigin
                        src={player.avatar}
                        className={player.class}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        drag
                        ref={provided.innerRef}
                      ></motion.img>
                    )}
                  </Draggable>

                  {/* {provided.placeholder} */}
                </div>
              )}
            </Droppable>
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
