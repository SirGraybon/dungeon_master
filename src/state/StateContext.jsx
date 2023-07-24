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
  const editDice = function (d) {
    let keyCounter = state.dice.length;
    const currentDice = [...state.dice];
    if (d === "XX") {
      return dispatch({ type: "EDIT_DICE", payload: [] });
    }

    if (currentDice.length < 9) {
      currentDice.push({
        die_key: keyCounter,
        die_type: d,
        result: 0,
        status: "not_rolled",
      });
      dispatch({ type: "EDIT_DICE", payload: currentDice });
    }
  };
  const rollDie = function (index) {
    const currentDice = [...state.dice];
    let targetDie = currentDice[index];
    targetDie.result = Math.floor(Math.random() * targetDie.die_type) + 1;
    const feedUpdate = `User rolled a D${targetDie.die_type}. Result: ${targetDie.result}`;
    postMessage(feedUpdate, "diceRoll")
    targetDie.status = "rolled";
    dispatch({ type: "ROLL_DIE", payload: currentDice });
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
    if (!destination) return;
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
      return dispatch({ type: "UPDATE_DATA", payload: newData });
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

      return dispatch({ type: "UPDATE_DATA", payload: newData });
    }
  };

  ////////////////////DISPLAY FUNCTIONs////////////////////////////////////////////////////////////

  const setDisplay = function (displayType, player) {
    dispatch({ type: "SET_DISPLAY", displayType, player });
  };
  ////////////////////EDIT TERRAIN FUNCTIONs////////////////////////////////////////////////////////////

  const editTerrain = function (target) {
    state.terrainBrush && dispatch({ type: "EDIT_TERRAIN", payload: target });
  };

  const setTerrainBrush = function (option) {
    dispatch({ type: "SET_TERRAIN_BRUSH", payload: option });
  };
  ////////////////////FEED UPDATEs////////////////////////////////////////////////////////////
  const postMessage = function (message, type) {
    dispatch({ type: "POST_MESSAGE", payload: message, postType: type });
  };

  ////////////////////EXPORT FOR FUNCTIONs & STATE////////////////////////////////////////////////////////////
  const value = {
    editDice,
    rollDie,
    clearDice,
    rollAllDice,
    handleDrag,
    setDisplay,
    editTerrain,
    setTerrainBrush,
    postMessage,
    state,
    data: state.data,
    display: state.display,
    selectedPlayer: state.selectedPlayer,
    feed: state.feed,
    terrainOptions: state.terrainOptions,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const shareState = () => {
  const context = useContext(StateContext);
  return context;
};

export default shareState;
