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
                <div className="outterTokenArea">

                <motion.div
                className="tokenArea"
                whileHover={{ borderRadius: 25, width: 50, height: 50 }}
                style={{ backgroundColor: player.colour }}
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
                      <div
                      className="token"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      >
                        <img
                          className="token"
                          src={player.avatar}
                          style={{ backgroundColor: player.colour }}
                          />
                      </div>
                    )}
                  </Draggable>

                  {/* {provided.placeholder} */}
                </motion.div>
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
