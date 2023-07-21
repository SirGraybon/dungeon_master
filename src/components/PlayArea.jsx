////////////////////IMPORTs ////////////////////////////////////////////////////////////
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";
import Board from "./Board";
import InformationCenter from "./InformationCenter";
import Feed from "./Feed";

const PlayArea = function (props) {
  const { handleDrag} = shareState();

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="playArea">
        <Board />
        <InformationCenter />
      </div>
      <Feed/>
    </DragDropContext>
  );
};

export default PlayArea;
