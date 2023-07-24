import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";

const Inventory = function() {
  const {selectedPlayer} = shareState()
  return(
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
  )
}

export default Inventory