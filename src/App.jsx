import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DATA from "./data/data";

for (let i = 0; i < 400; i++) {
  DATA.cellDATA.push({ id: `${i}`, content: [] });
}

function App() {
  // const [players, setPlayers] = useState(DATA.playerDATA);
  // const [cells, setCells] = useState(DATA.cellDATA);
  const [data, setData] = useState(DATA);

  //HandleDrag Function
  const handleDrag = function (results) {
    console.log(results);
    const { source, destination, type } = results;
    const newData = { ...data };
    const destCell = newData.cellDATA.findIndex(
      (cell) => cell.id === destination.droppableId
    );
    const destIndex = destination.index;

    //dropping in play from source: result - add to play area
    if (
      destination.droppableId !== "source" &&
      source.droppableId === "source"
    ) {
      const sourceIndex = newData.playerDATA.findIndex(
        (player) => player.characterName === results.draggableId
      );
      console.log(sourceIndex);
      const currentLocation = newData.playerDATA[sourceIndex].location;

      const token = newData.playerDATA[source.index];
      newData.cellDATA[destCell].content.push(token);
      if (currentLocation > 0) {
        newData.cellDATA[currentLocation].content = [];
      }
      newData.playerDATA[sourceIndex].location = destCell;
      console.log(newData);
      return setData(newData);
    }

    //Dropping out of bounds: result - no action
    if (!destination) return;

    //droppin in same cell: result - rearange

    if (source.droppableId !== destination.droppableId) {
      const sourceCell = newData.cellDATA.findIndex(
        (cell) => cell.id === source.droppableId
      );

      const [moving] = newData.cellDATA[sourceCell].content.splice(
        source.index,
        1
      );
      newData.cellDATA[destCell].content.splice(destIndex, 0, moving);

      return setData(newData);
    }
  };

  ////////////////////////////  FUNCTION RETURN ////////////////////////////////
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="playArea">
        <div className="source">
          {data.playerDATA.map((player, index) => {
            return (
              <div className="playerCard">
                <Droppable
                  droppableId="source"
                  type="cell"
                  isDropDisabled={true}
                >
                  {(provided) => (
                    <div
                      className="tokenArea"
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
                      {/* {provided.placeholder} */}
                    </div>
                  )}
                </Droppable>
                <div className="playerInfo">
                  <h4>{player.characterName}</h4>
                  <h4>{player.characterName}</h4>
                </div>
                <div className="playerStatus">
                  <h4>{player.characterName}</h4>
                  <h4>{player.characterName}</h4>
                </div>
              </div>
            );
          })}
        </div>

        <div className="board">
          {data.cellDATA.map((cell) => {
            // const index = 0;
            // if (cell.content.length > 0) {
            return (
              <Droppable
                droppableId={cell.id}
                key={cell.id}
                type="cell"
                isDropDisabled={cell.content.length}
              >
                {(provided) => (
                  <div
                    className="cell"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {cell.content.map((player, index) => {
                      return (
                        <Draggable
                          key={player.id}
                          draggableId={"playing" + player.characterName}
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
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
