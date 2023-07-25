import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";
import "../styles/equipment.css";
import { useState } from "react";

const Equipment = function () {
  const right = ["gloves", "right", "boots"];
  const center = ["head", "torso", "belt", "legs"];
  const left = ["amulet", "left", "ring"];
  const [equipCat, setEquipCat] = useState("head");
  const { selectedPlayer } = shareState();

  const handleClick = function(selection){
    console.log(selection)
    setEquipCat(selection)
  }
  return (
    <DragDropContext>
      <div className="equipmentContainer">
        <div className="equipment">
          <div className="equipmentColumn">
            {right.map((slot) => {
              return (
                <Droppable droppableId={slot} type={slot}>
                  {(provided) => (
                    <div
                      className="equipmentSlot"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      onClick={()=> handleClick(slot)}
                    >
                      {slot}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
          <div className="equipmentColumn">
            {center.map((slot) => {
              return (
                <Droppable droppableId={slot} type={slot}>
                  {(provided) => (
                    <div
                      className="equipmentSlot"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      onClick={()=> handleClick(slot)}
                    >
                      {slot}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
          <div className="equipmentColumn">
            {left.map((slot) => {
              return (
                <Droppable droppableId={slot} type={slot}>
                  {(provided) => (
                    <div
                      className="equipmentSlot"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      onClick={()=> handleClick(slot)}
                    >
                      {slot}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>

        <Droppable droppableId="inventory" type={equipCat}>
          {(provided) => (
            <div
              className="filteredInventory"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {selectedPlayer.player_inventory.map((item, index) => {
                if (item.item_type === equipCat) {
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
                }
              })}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Equipment;
