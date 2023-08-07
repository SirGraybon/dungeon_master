import "../styles/board.css";
import shareState from "../state/StateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import grass from "../assets/terrain/grass.png";
import dirt from "../assets/terrain/dirt.png";
import wall from "../assets/terrain/wall.png";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  initial: {
    x: 400,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: { x:-200, opacity: 0.7 },
};

export default function Board() {
  const { cells, editTerrain, board_row, board_column, droppableCells } =
    shareState();
  return (
    <>
    <AnimatePresence>
      <motion.div
        variants={variants}
        animate="animate"
        initial="initial"
        exit="exit"
        className="board"
        key={cells}
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
                  droppableCells.includes(cell.id) ? "droppableCell" : "cell"
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
                  {cell.id}
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
