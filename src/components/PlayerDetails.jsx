import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/playerDetails.css";

const PlayerDetails = function (props) {
  const { player, setModalPlayer } = props;
  console.log(player);

  const handleClick = function () {
    setModalPlayer(false);
  };

  return (
    <div className="playerModal">
      <div className="playerDetails">
        <div className="playerDetailsSection">
          <img className="avatar" src={player.avatar} alt="" />
          <p>
            {player.characterName} | {player.class}
          </p>
          <p>
            {player.current_health} / {player.max_health} HP
          </p>
        </div>
        <div className="playerDetailsSection">
          <p> Dex: {player.stats.Dex} </p>
          <p> Str: {player.stats.Str} </p>
          <p> Con: {player.stats.Con} </p>
          <p> Int: {player.stats.Int} </p>
          <p> Chr: {player.stats.Chr} </p>
          <p> Wis: {player.stats.Wis} </p>
        </div>
        <div className="playerDetailsSection">
          <div>Level: {player.level}</div>
          <div>Gold: {player.gold}</div>
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
              {player.player_inventory.map((item, index) => {
                return (
                  <Draggable
                    droppableId={item.item}
                    draggableId={item.item}
                    index={index}
                  >
                    {(provided) => (
                      <img title={item.item + ": " + item.description}  
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
