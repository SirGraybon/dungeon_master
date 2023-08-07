import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";
import "../styles/equipment.css";
import { useState } from "react";

const Equipment = function () {
  const slots = [
    ["gloves", "right", "boots"],
    ["head", "torso", "belt", "legs"],
    ["amulet", "left", "ring"],
  ];

  const [equipCat, setEquipCat] = useState(null);
  const { selectedPlayer, handleEquip } = shareState();

  const handleClick = function (selection) {
    setEquipCat(selection);
  };
  return (
    <DragDropContext onDragEnd={handleEquip}>
      <div className="equipmentContainer">
        <div className="equipment">
          {slots.map((slotColumn) => {
            return (
              <div className="equipmentColumn">
                {slotColumn.map((slot) => {
                  return (
                    <Droppable droppableId={slot} type={slot}>
                      {(provided) => (
                        <div
                          className="equipmentSlot"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          onClick={() => handleClick(slot)}
                        >
                          {selectedPlayer.equipment[slot].length > 0 ? (
                            <Draggable
                              droppableId={
                                selectedPlayer.equipment[slot][0].item
                              }
                              draggableId={
                                selectedPlayer.equipment[slot][0].item
                              }
                              index={0}
                            >
                              {(provided) => (
                                <img
                                  title={
                                    selectedPlayer.equipment[slot][0].item +
                                    ": " +
                                    selectedPlayer.equipment[slot][0]
                                      .description
                                  }
                                  index={0}
                                  key={selectedPlayer.equipment[slot][0].item}
                                  src={selectedPlayer.equipment[slot][0].token}
                                  className="inventoryItem"
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                ></img>
                              )}
                            </Draggable>
                          ) : (
                            slot
                          )}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            );
          })}
        </div>
        {equipCat !== null ? (
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
        ) : (
          <div className="filteredInventory">Select equipment slot above</div>
        )}
      </div>
    </DragDropContext>
  );
};

export default Equipment;
