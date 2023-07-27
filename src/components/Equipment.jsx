import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import shareState from "../state/StateContext";
import "../styles/equipment.css";
import { useState } from "react";

const Equipment = function () {
  const right = ["gloves", "right", "boots"];
  const center = ["head", "torso", "belt", "legs"];
  const left = ["amulet", "left", "ring"];
  const [equipCat, setEquipCat] = useState(null);
  const { selectedPlayer } = shareState();

  const handleClick = function (selection) {
    console.log(selectedPlayer.equipment[equipCat]);
    setEquipCat(selection);
  };
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
                      onClick={() => handleClick(slot)}
                    >
                      {typeof selectedPlayer.equipment[slot] === "object" ? (
                        <Draggable
                          droppableId={selectedPlayer.equipment[slot].item}
                          draggableId={selectedPlayer.equipment[slot].item}
                        >
                          {(provided) => (
                            <img
                              title={
                                selectedPlayer.equipment[slot].item +
                                ": " +
                                selectedPlayer.equipment[slot].description
                              }
                              key={selectedPlayer.equipment[slot].item}
                              src={selectedPlayer.equipment[slot].token}
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

          <div className="equipmentColumn">
            {center.map((slot) => {
              return (
                <Droppable droppableId={slot} type={slot}>
                  {(provided) => (
                    <div
                      className="equipmentSlot"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      onClick={() => handleClick(slot)}
                    >
                      {typeof selectedPlayer.equipment[slot] === "object" ? (
                        <Draggable
                          droppableId={selectedPlayer.equipment[slot].item}
                          draggableId={selectedPlayer.equipment[slot].item}
                        >
                          {(provided) => (
                            <img
                              title={
                                selectedPlayer.equipment[slot].item +
                                ": " +
                                selectedPlayer.equipment[slot].description
                              }
                              key={selectedPlayer.equipment[slot].item}
                              src={selectedPlayer.equipment[slot].token}
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

          <div className="equipmentColumn">
            {left.map((slot) => {
              return (
                <Droppable droppableId={slot} type={slot}>
                  {(provided) => (
                    <div
                      className="equipmentSlot"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      onClick={() => handleClick(slot)}
                    >
                      {typeof selectedPlayer.equipment[slot] === "object" ? (
                        <Draggable
                          droppableId={selectedPlayer.equipment[slot].item}
                          draggableId={selectedPlayer.equipment[slot].item}
                        >
                          {(provided) => (
                            <img
                              title={
                                selectedPlayer.equipment[slot].item +
                                ": " +
                                selectedPlayer.equipment[slot].description
                              }
                              key={selectedPlayer.equipment[slot].item}
                              src={selectedPlayer.equipment[slot].token}
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
