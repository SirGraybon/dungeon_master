import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PlayerDetails from "./PlayerDetails";
import DiceBowl from "./DiceBowl";
import { useState } from "react";

const PlayArea = function (props) {
  const { data, modalPlayer, setModalPlayer, modalType, setModalType } = props;
  const [dice, setDice] = useState([]);
  const handleClick = function (player) {

    setModalPlayer(player);
  };


  return (
    <div className="playArea">

      {/* ///////////////////////////// PLAY BOARD /////////////////////////////////////////////// */}
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
                  {/* {provided.placeholder} */}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>

      {/* ////////////////////////////////////PLAYER LIST AND INFO /////////////////////////////////// */}


      <div className="information_center">
        <div className="source">
          {data.playerDATA.map((player, index) => {
            return (
              <div className="playerCard">
                <Droppable
                  droppableId="source"
                  type="cell"
                  isDropDisabled={true}
                >
                  {(provided) => (
                    <div
                      className="tokenArea"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Draggable
                        key={player.characterName}
                        draggableId={player.characterName}
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
                      
                      {/* {provided.placeholder} */}
                    </div>
                  )}
                </Droppable>
                <div className="infoArea" onClick={() => handleClick(player)}>
                  <div className="playerInfo">
                    <p className="playerName">{player.characterName}</p>
                    <p>{player.class}</p>
                  </div>
                  <div className="playerStatus">
                    <h4>
                      {player.current_health} / {player.max_health}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="option_bar">
          <button onClick={() => handleClick("diceBowl")}> Dice Bowl</button>
        </div>
{modalPlayer !== "diceBowl" && <PlayerDetails player={modalPlayer}/>}
{modalPlayer === "diceBowl" && <DiceBowl dice={dice} setDice={setDice}/>}
        
      </div>
    </div>
  );
};

export default PlayArea;
