import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";
import "../styles/equipment.css";

const Equipment = function () {
  const { selectedPlayer } = shareState();
  return (
    <div className="equipmentContainer">
      <div className="equipment">
        <div className="equipmentColumn">
          <div className="equipmentSlot">gloves</div>
          <div className="equipmentSlot">rignt</div>
          <div className="equipmentSlot">boots</div>
        </div>
        <div className="equipmentColumn">
          <div className="equipmentSlot">head</div>
          <div className="equipmentSlot">torso</div>
          <div className="equipmentSlot">belt</div>
          <div className="equipmentSlot">legs</div>
        </div>
        <div className="equipmentColumn">
          <div className="equipmentSlot">amulet</div>
          <div className="equipmentSlot">left</div>
          <div className="equipmentSlot">ring</div>
        </div>
      </div>
      <div className="filteredInventory"></div>
    </div>
  );
};

export default Equipment;
