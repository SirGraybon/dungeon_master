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
    ],
  },
  { id: "B", content: [] },
  { id: "C", content: [] },
  { id: "D", content: [] },
  { id: "E", content: [] },
];

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
      const destCoord = results.destination.index;
      newData[destCoord].content.push(players[source.index]);
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



      {cells.map((cell) => {
        const index = 0
        if(cell.content.length === 1){
        return(
          
          <Droppable droppableId={cell.id} key={cell.id} type="cell">
          {(provided) => (
            <div
            className="cell"
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
                <Draggable
                key={cell.content[0].id}
                draggableId={cell.content[0].characterName}
                index={index}
                >
                  {(provided) => (
                    <div
                    className={cell.content[0].class}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    ></div>
                    )}
                </Draggable>
                {provided.placeholder}
            </div>
      )}
              
      
        </Droppable>
        )} else {
          return(
            <Droppable droppableId={cell.id} key={cell.id} type="cell">
            {(provided) => (
              <div
              className="cell"
              {...provided.droppableProps}
              ref={provided.innerRef}
              >
                  {provided.placeholder}
              </div>
        )}
                
        
          </Droppable>
          )
        }
        
        
        
        
        })}
    
    </DragDropContext>
  );
}

export default App;
