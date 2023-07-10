import { useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const playerDATA = [
  {id: 1, characterName: "Bim", class: "Wizard", color: "#9c362d"},
  {id: 2, characterName: "Bam", class: "Warrior", color: "#424959"},
  {id: 3, characterName: "Bom", class: "Rogue", color: "#273c1d"},
]

 const cellData = [
  {id:"A", constent: []}
  {id:"B", constent: []}
  {id:"C", constent: []}
  {id:"D", constent: []}
  {id:"E", constent: []}
 ]

function App() {

const [players, setPlayers] = useState(playerDATA)
const [cell, setCell] = useState(cellDATA)

  const handleDrag = function(results) {
    console.log(results)
    const {source, destination, type} = results;

    if(!destination) return;
    if(source.droppableId === destination.droppableId && source.index === destination.index) return
    console.log(results)
    const newArr = [...players]
    const [moving] = newArr.splice(source.index, 1)
    
    newArr.splice(destination.index, 0, moving)
    return setPlayers(newArr)

  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId='A' type="cell">
        {(provided) => (
          <div className='cell' {...provided.droppableProps} ref={provided.innerRef}>
            {players.map((player, index) => {
              return(

            <Draggable key={player.id} draggableId={player.characterName} index={index}>
              {(provided) => (
                <div className={player.class} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>

                </div>
              )}
            </Draggable>
              )
            })}
          </div>
        )}
      </Droppable>
      {}
      <Droppable droppableId='B' type="cell">
        {(provided) => (
          <div className='cell' {...provided.droppableProps} ref={provided.innerRef}>

          </div>
        )}
      </Droppable>
    </DragDropContext>

    
  )
}

export default App
