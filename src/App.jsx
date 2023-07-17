import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DATA from "./data/data";
import PlayArea from "./components/PlayArea";
import PlayerDetails from "./components/PlayerDetails";

function App() {
  // const [players, setPlayers] = useState(DATA.playerDATA);
  // const [cells, setCells] = useState(DATA.cellDATA);
  const [data, setData] = useState(DATA);
  const [modalPlayer, setModalPlayer] = useState('DiceBowl')
  
  ////////////////////////////  HANDLE DRAG FUNCTION ///////////////////////////
  const handleDrag = function (results) {
    console.log(results);
    const { source, destination, type } = results;
    if (!destination ) return;
    const newData = { ...data };
    const destCell = newData.cellDATA.findIndex(
      (cell) => cell.id === destination.droppableId
    );
    const destIndex = destination.index;

    //dropping in play from source: result - add to play area
    if (
      destination.droppableId !== "source" &&
      source.droppableId === "source"
    ) {
      const sourceIndex = newData.playerDATA.findIndex(
        (player) => player.characterName === results.draggableId
      );
      console.log(sourceIndex);
      const currentLocation = newData.playerDATA[sourceIndex].location;

      const token = newData.playerDATA[source.index];
      newData.cellDATA[destCell].content.push(token);
      if (currentLocation > 0) {
        newData.cellDATA[currentLocation].content = [];
      }
      newData.playerDATA[sourceIndex].location = destCell;
      console.log(newData);
      return setData(newData);
    }

   //droppin in same cell: result - rearange
   if (source.droppableId !== destination.droppableId) {
    const sourceCell = newData.cellDATA.findIndex(
      (cell) => cell.id === source.droppableId
    );

    const [moving] = newData.cellDATA[sourceCell].content.splice(
      source.index,
      1
    );
    newData.cellDATA[destCell].content.splice(destIndex, 0, moving);

    return setData(newData);
  }

  };


  ////////////////////////////  CLOSE MODAL FUNCTION ///////////////////////////
  const closeModal = function() {
    setModalPlayer(false)
  }
  ////////////////////////////  FUNCTION RETURN ////////////////////////////////
  return (
    <>
      <DragDropContext onDragEnd={handleDrag}>
        <PlayArea data={data} modalPlayer={modalPlayer} setModalPlayer={setModalPlayer} />
      </DragDropContext>


    </>
  );
}

export default App;
