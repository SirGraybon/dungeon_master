////////////////////IMPORTs ////////////////////////////////////////////////////////////
import { createContext, useContext, useReducer } from "react";
import reducer, { defaultState } from "./state";
////////////////////useContext////////////////////////////////////////////////////////////
const StateContext = createContext(defaultState);
export const StateProvider = ({ children }) => {
////////////////////useReducer////////////////////////////////////////////////////////////
  const [state, dispatch] = useReducer(reducer, defaultState);
////////////////////FUNCTIONs////////////////////////////////////////////////////////////
////////////////////DICE FUNCTIONs////////////////////////////////////////////////////////////
const addDie = function (d) {
  dispatch({ type: "EDIT_DICE", die_type: d });
};
const rollDie = function (index) {
  dispatch({ type: "ROLL_DIE", index: index });
};
const clearDice = function () {
  dispatch({ type: "EDIT_DICE", die_type: "XX" });
};
const rollAllDice = function () {
  state.dice.forEach((die, index) => {
    if (die.status === "not_rolled") {
      rollDie(index);
    }
  });
};

////////////////////DRAG AND DROP FUNCTIONs////////////////////////////////////////////////////////////
  const handleDrag = function (results) {
    console.log(results);
    const { source, destination, type } = results;
    if (!destination ) return;
    const newData = { ...state.data };
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
      return dispatch({type: "UPDATE_DATA", payload: newData})
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

    return dispatch({type: "UPDATE_DATA", payload: newData})
  }

  };

  ////////////////////DISPLAY FUNCTIONs////////////////////////////////////////////////////////////

  const setDisplay = function(displayType, player) {
    dispatch({type: "SET_DISPLAY", displayType, player})
  }

  ////////////////////EXPORT FOR FUNCTIONs & STATE////////////////////////////////////////////////////////////
  const value = {
    addDie,
    rollDie,
    clearDice,
    rollAllDice,
    handleDrag,
    setDisplay,
    data: state.data,
    state,
    display: state.display,
    selectedPlayer: state.selectedPlayer

  };

  return (
    <StateContext.Provider value={value}>
      {children} 
    </StateContext.Provider>
  );
};

const shareState = () => {
  const context = useContext(StateContext)
  return context
}

export default shareState
