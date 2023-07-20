////////////////////IMPORTs ////////////////////
import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Data from "./data/data";
import PlayArea from "./components/PlayArea";
import PlayerDetails from "./components/PlayerDetails";
import StateHook from "./state/state";
import shareState,  { StateProvider } from "./state/StateContext";


function App() {
  const {handleDrag} = shareState()
  // const [players, setPlayers] = useState(DATA.playerDATA);
  // const [cells, setCells] = useState(DATA.cellDATA);
  // const [data, setData] = useState(Data);
  const [modalPlayer, setModalPlayer] = useState("diceBowl")
  // const [modalType, setModalType] = useState()
  const [log, setLog] = useState([])
  
  


  ////////////////////////////  CLOSE MODAL FUNCTION ///////////////////////////
  const closeModal = function() {
    setModalPlayer(false)
  }
  ////////////////////////////  FUNCTION RETURN ////////////////////////////////
  return (
    <StateProvider>
      {/* <DragDropContext onDragEnd={() => handleDrag}> */}
        <PlayArea  modalPlayer={modalPlayer} setModalPlayer={setModalPlayer} />
      {/* </DragDropContext> */}


    </StateProvider>
  );
}

export default App;
