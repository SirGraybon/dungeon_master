import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DATA from "./data/data";


for (let i = 0; i < 400; i++) {
  DATA.cellDATA.push({ id: `${i}`, content: [] });
}

function App() {
  const [players, setPlayers] = useState(DATA.playerDATA);
  const [cells, setCells] = useState(DATA.cellDATA);

  //HandleDrag Function
  const handleDrag = function (results) {
    console.log(results);
    console.log(cells);
    const { source, destination, type } = results;
    //dropping in play from source: result - add to play area
    if (destination.droppableId !== "source" && source.droppableId === "source"){
      const newData = [...cells]      
      const destCell = newData.findIndex(
        (cell) => cell.id === destination.droppableId
      );
      const destIndex = destination.index;
      const token = players[source.index]
      newData[destCell].content.push(token)
      return setCells(newData)

      

    }
    //Dropping out of bounds: result - no action
    if (!destination) return;
    //droppin in same cell: result - rearange
    if (source.droppableId === destination.droppableId) {
      const newArr = [...players];
      const [moving] = newArr.splice(source.index, 1);

      newArr.splice(destination.index, 0, moving);
      return setPlayers(newArr);
    }
    if (source.droppableId !== destination.droppableId) {
      const newData = [...cells];
      const sourceCell = newData.findIndex(
        (cell) => cell.id === source.droppableId
      );
      const destCell = newData.findIndex(
        (cell) => cell.id === destination.droppableId
      );
      const destIndex = destination.index;
      const [moving] = newData[sourceCell].content.splice(source.index, 1);
      newData[destCell].content.splice(destIndex, 0, moving);
      console.log(newData);

      return setCells(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="playArea">
        <Droppable droppableId="source" type="cell">
          {(provided) => (
            <div
              className="source"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {players.map((player, index) => {
                return (
                  <div className="playerInfo">
                    <div className="tokenArea">

                  <Draggable
                    key={player.characterName}
                    draggableId={player.characterName}
                    index={index}
                    >
                    {(provided) => (
                      <img src={player.avatar}
                      className={player.class}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      ></img>
                      )}
                  </Draggable>
                      </div>
                      </div>
                );
              })}
          {provided.placeholder}
            </div>
          )}
        </Droppable>




        {/* PLAYERGRID */}
        <div className="board">
          {cells.map((cell) => {
            // const index = 0;
            // if (cell.content.length > 0) {
            return (
              <Droppable droppableId={cell.id} key={cell.id} type="cell">
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
                          draggableId={player.characterName}
                          index={index}
                        >
                          {(provided) => (
                            <img src={player.avatar}
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
