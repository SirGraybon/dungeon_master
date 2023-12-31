import "../styles/board.css";
import shareState from "../state/StateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import grass from "../assets/terrain/grass.png";
import dirt from "../assets/terrain/dirt.png";
import wall from "../assets/terrain/wall.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Board() {
  const {
    cells,
    editTerrain,
    board_row,
    board_column,
    droppableCells,
    boardDirectionAnimation,
  } = shareState();
  const indexLog = `${board_row} ${board_column}`;
  const direction = boardDirectionAnimation;
  const variants = {
    initial: () => {
      console.log("initial" + direction);
      return {
        x:
          (direction === "right" && 300) || (direction === "left" && -300) || 0,
        y: (direction === "up" && -300) || (direction === "down" && 300) || 0,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 100, dampping: 100 },
        y: { type: "spring", stiffness: 100, dampping: 50 },
        duration: 0.2,
      },
    },
    exit: (direction) => {
      console.log("exit" + direction);
      return {
        x:
          (direction === "right" && -300) || (direction === "left" && 300) || 0,
        y: (direction === "up" && 300) || (direction === "down" && -300) || 0,
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      };
    },
  };

  return (
    <>
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          variants={variants}
          animate="animate"
          initial="initial"
          exit="exit"
          className="board"
          key={indexLog}
        >
          {cells[board_row][board_column].map((cell, index) => {
            return (
              <Droppable
                droppableId={cell.id}
                key={cell.id}
                type="cell"
                isDropDisabled={cell.content.length > 0}
              >
                {(provided) => (
                  <div
                    className={
                      droppableCells.includes(cell.id)
                        ? "droppableCell"
                        : "cell"
                    }
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ backgroundImage: `url(${cell.background})` }}
                    onClick={() => editTerrain(index)}
                  >
                    {cell.content.map((player, index) => {
                      return (
                        <Draggable
                          key={player.id}
                          draggableId={"playing" + player.characterName}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="token"
                              onClick={()=> console.log("shazam")}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <img
                                className="token"
                                src={player.avatar}
                                style={{ backgroundColor: player.colour }}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    {/* {cell.id} */}
                  </div>
                )}
              </Droppable>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
