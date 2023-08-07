////////////////////IMPORTs ////////////////////////////////////////////////////////////
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";
import Board from "./Board";
import InformationCenter from "./InformationCenter";
import Feed from "./Feed";
import "../styles/board.css";
// import { motion, AnimatePresence } from "framer-motion";

// const variants = {
//   initial: {
//     x: 200,
//     opacity: 0,
//   },
//   animate: {
//     x: 0,
//     opacity: 1,
//   },
//   exit: { x: -200, opacity: 0 },
// };

const PlayArea = function (props) {
  const {
    handleDrag,
    moveBoard,
    calculateDrop,
    cells,
    board_column,
    board_row,
  } = shareState();

  const handleClick = function (direction) {
    moveBoard(direction);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="playArea">
        <Feed />
        <div
          className="boardMoveButtonVertical"
          onClick={() => handleClick("left")}
        >
          ◁
        </div>
        <div>
          <div
            className="boardMoveButtonHorizontal"
            onClick={() => handleClick("up")}
          >
            △
          </div>
          
            <div>
              <Board />
            </div>
          
          <div
            className="boardMoveButtonHorizontal"
            onClick={() => handleClick("down")}
          >
            ▽
          </div>
        </div>
        <div
          className="boardMoveButtonVertical"
          onClick={() => handleClick("right")}
        >
          ▷
        </div>
        <InformationCenter />
      </div>
    </DragDropContext>
  );
};

export default PlayArea;
