////////////////////IMPORTs ////////////////////////////////////////////////////////////
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";
import Board from "./Board";
import InformationCenter from "./InformationCenter";
import Feed from "./Feed";
import "../styles/board.css"

const PlayArea = function (props) {
  const { handleDrag, moveBoard, calculateDrop } = shareState();

  const handleClick = function(direction){
    moveBoard(direction)
  }

  return (
    <DragDropContext onDragEnd={handleDrag} >
      <div className="playArea">
        <Feed />
        <div className="boardMoveButtonVertical" onClick={() => handleClick("left")}>◁</div>
        <div>
          <div className="boardMoveButtonHorizontal" onClick={() => handleClick("up")}>△</div>
          <Board />
          <div className="boardMoveButtonHorizontal" onClick={() => handleClick("down")}>▽</div>
        </div>
        <div className="boardMoveButtonVertical" onClick={() => handleClick("right")}>▷</div>
        <InformationCenter />
      </div>
    </DragDropContext>
  );
};

export default PlayArea;
