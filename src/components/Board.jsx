import "../styles/adventureMap.css";
import shareState from "../state/StateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Board() {
  const { data, handleDrag, display, setDisplay } = shareState();
  return (
    <div className="board">
      {data.cellDATA.map((cell) => {
        return (
          <Droppable
            droppableId={cell.id}
            key={cell.id}
            type="cell"
            isDropDisabled={cell.content.length > 0}
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
  );
}
