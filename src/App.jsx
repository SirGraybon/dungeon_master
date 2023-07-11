import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const playerDATA = [
  { id: 1, characterName: "Bim", class: "Wizard", color: "#9c362d" },
  { id: 2, characterName: "Bam", class: "Warrior", color: "#424959" },
  { id: 3, characterName: "Bom", class: "Rogue", color: "#273c1d" },
];

const cellDATA = [
  {
    id: "A",
    content: [
      { id: 1, characterName: "Bim", class: "Wizard", color: "#9c362d" },
      { id: 2, characterName: "Bam", class: "Warrior", color: "#424959" },
      { id: 3, characterName: "Bom", class: "Rogue", color: "#273c1d" },
    ],
  },

];

for (let i = 0; i < 400; i++){
  cellDATA.push({ id: `${i}`, content: [] },)
}


function App() {
  const [players, setPlayers] = useState(playerDATA);
  const [cells, setCells] = useState(cellDATA);

  //HandleDrag Function
  const handleDrag = function (results) {
    console.log(results);
    const { source, destination, type } = results;

    if (!destination) return;
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
      <Droppable droppableId="source" type="cell">
        {(provided) => (
          <div
            className="cell"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {players.map((player, index) => {
              return (
                <Draggable
                  key={player.id}
                  draggableId={player.characterName}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={player.class}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    ></div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
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
                          <div
                            className={player.class}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          ></div>
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
    </DragDropContext>
  );
}

export default App;
