import { useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const players = [
  {id: 1, characterName: "Bim", class: "Wizard", color: "#9c362d"},
  {id: 2, characterName: "Bam", class: "Warrior", color: "#424959"},
  {id: 3, characterName: "Bom", class: "Rogue", color: "#273c1d"},
]

function App() {

  return (
    <DragDropContext onDragEnd={console.log("wow")}>
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
