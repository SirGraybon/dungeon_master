import "../styles/adventureMap.css";
import shareState from "../state/StateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DiceBowl from "./DiceBowl";
import PlayerDetails from "./PlayerDetails";

export default function InformationCenter() {
  const { data, handleDrag, display, setDisplay } = shareState();

  return (
    <div className="information_center">
      <div className="source">
        {data.playerDATA.map((player, index) => {
          return (
            <div className="playerCard" key={player.name}>
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
                        <img
                          src={player.avatar}
                          className={player.class}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        ></img>
                      )}
                    </Draggable>

                    {provided.placeholder}
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
      <div className="option_bar">
        <button onClick={() => setDisplay("diceBowl", null)}> Dice Bowl</button>
      </div>
      {display === "player" && <PlayerDetails />}
      {display === "diceBowl" && <DiceBowl />}
    </div>
  );
}
