import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/playerDetails.css";
import shareState from "../state/StateContext";

const PlayerDetails = function (props) {
  const { selectedPlayer } = shareState();

  return (
    <div className="playerModal">
      <div className="playerDetails">
        <div className="playerDetailsSection">
          <img className="avatar" src={selectedPlayer.avatar} alt="" />
          <p>
            {selectedPlayer.characterName} | {selectedPlayer.class}
          </p>
          <p>
            {selectedPlayer.current_health} / {selectedPlayer.max_health} HP
          </p>
        </div>
        <div className="playerDetailsSection">
          <p> Dex: {selectedPlayer.stats.Dex} </p>
          <p> Str: {selectedPlayer.stats.Str} </p>
          <p> Con: {selectedPlayer.stats.Con} </p>
          <p> Int: {selectedPlayer.stats.Int} </p>
          <p> Chr: {selectedPlayer.stats.Chr} </p>
          <p> Wis: {selectedPlayer.stats.Wis} </p>
        </div>
        <div className="playerDetailsSection">
          <div>Level: {selectedPlayer.level}</div>
          <div>Gold: {selectedPlayer.gold}</div>
        </div>
      </div>
      <DragDropContext onDragEnd={console.log("dragging")}>
        <Droppable droppableId="inventory" type="inventory">
          {(provided) => (
            <div
              className="inventory"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {selectedPlayer.player_inventory.map((item, index) => {
                return (
                  <Draggable
                    droppableId={item.item}
                    draggableId={item.item}
                    index={index}
                  >
                    {(provided) => (
                      <img
                        title={item.item + ": " + item.description}
                        key={item.item}
                        src={item.token}
                        className="inventoryItem"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      ></img>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PlayerDetails;
