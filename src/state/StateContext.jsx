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
    const feedUpdate = ` rolled a D${targetDie.die_type}. Result: ${targetDie.result}`;
    postMessage(feedUpdate, "diceRoll");
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
  ////////////////////DRAG AND DROP BOARD////////////////////////////////////////////////////////////
  ////////////////////onDRAG START////////////////////////////////////////////////////////////
  const calculateDrop = function (results) {
    if (results.droppableId !== "source") {
      let allowedCells = [];
      const cellID = results.source.droppableId;
      for (let i = 0; i < 3; i++) {
        allowedCells.push(cellID + i);
        allowedCells.push(cellID - i);
        allowedCells.push(cellID + 20 + i);
        allowedCells.push(cellID + 20 - i);
        allowedCells.push(cellID - 20 + i);
        allowedCells.push(cellID - 20 - i);
        allowedCells.push(cellID + 40 + i);
        allowedCells.push(cellID + 40 - i);
        allowedCells.push(cellID - 40 + i);
        allowedCells.push(cellID - 40 - i);
      }
      dispatch({ type: "CHECK_DROP_ALLOWED", payload: allowedCells });
    }
  };
  ////////////////////onDRAG END////////////////////////////////////////////////////////////
  const handleDrag = function (results) {
    const board_row = state.board_row;
    const board_column = state.board_column;
    const { source, destination, type } = results;
    if (!destination) return;
    const players = [...state.players];
    const cells = [...state.cells];
    const destCell = cells[board_row][board_column].findIndex(
      (cell) => cell.id === destination.droppableId
    );

    const destIndex = destination.index;

    //dropping in play from source: result - add to play area
    if (
      destination.droppableId !== "source" &&
      source.droppableId === "source"
    ) {
      const sourceIndex = players.findIndex(
        (player) => player.characterName === results.draggableId
      );

      const currentLocation = players[sourceIndex].location;

      const token = players[source.index];
      cells[board_row][board_column][destCell].content.push(token);
      if (currentLocation > 0) {
        cells[board_row][board_column][currentLocation].content = [];
      }
      players[sourceIndex].location = destCell;
      return dispatch({ type: "UPDATE_DATA", players, cells });
    }

    //droppin in same cell: result - rearange
    if (source.droppableId !== destination.droppableId) {
      const sourceCell = cells[board_row][board_column].findIndex(
        (cell) => cell.id === source.droppableId
      );
      const sourceIndex = players.findIndex(
        (player) => player.characterName === results.draggableId
      );

      const [moving] = cells[board_row][board_column][
        sourceCell
      ].content.splice(source.index, 1);
      cells[board_row][board_column][destCell].content.splice(
        destIndex,
        0,
        moving
      );
      players[sourceIndex].location = destCell;

      return dispatch({ type: "UPDATE_DATA", players, cells });
    }
  };
  ////////////////////DRAG AND DROP EQUIPMENT////////////////////////////////////////////////////////////
  const handleEquip = function (results) {
    const players = [...state.players];
    const cells = [...state.cells];
    const selectedPlayer = state.selectedPlayer;
    const selectedPlayerIndex = players.findIndex(
      (player) => player.id === selectedPlayer.id
    );

    if (results.destination === null) {
      return;
    }
    ////////////////////////////////////////UNEQUIP ITEM////////////////////////////////////////////////////////////
    if (results.destination.droppableId === "inventory") {
      const prevItem =
        players[selectedPlayerIndex].equipment[results.source.droppableId][0];
      selectedPlayer.player_inventory.push(prevItem);
      selectedPlayer.equipment[results.source.droppableId].pop();
      players[selectedPlayerIndex] = selectedPlayer;
      return dispatch({ type: "UPDATE_DATA", players, cells });
    }
    ////////////////////////////////////////EQUIP ITEM////////////////////////////////////////////////////////////
    if (
      results.source.droppableId === "inventory" &&
      selectedPlayer.equipment[results.destination.droppableId].length < 1
    ) {
      const newItem =
        players[selectedPlayerIndex].player_inventory[results.source.index];
      selectedPlayer.equipment[results.destination.droppableId].push(newItem);
      selectedPlayer.player_inventory.splice(results.source.index, 1);
      players[selectedPlayerIndex] = selectedPlayer;
      return dispatch({ type: "UPDATE_DATA", players, cells });
    }
    ////////////////////////////////////////SWAP ITEM////////////////////////////////////////////////////////////
    if (results.source.droppableId === "inventory") {
      const newItem =
        players[selectedPlayerIndex].player_inventory[results.source.index];
      const prevItem =
        players[selectedPlayerIndex].equipment[
          results.destination.droppableId
        ][0];
      selectedPlayer.player_inventory.push(prevItem);
      selectedPlayer.equipment[results.destination.droppableId].pop();
      selectedPlayer.equipment[results.destination.droppableId].push(newItem);
      selectedPlayer.player_inventory.splice(results.source.index, 1);
      players[selectedPlayerIndex] = selectedPlayer;
      return dispatch({ type: "UPDATE_DATA", players, cells });
    }
  };

  ////////////////////DISPLAY FUNCTIONs////////////////////////////////////////////////////////////

  const setDisplay = function (displayType, player) {
    dispatch({ type: "SET_DISPLAY", displayType, player });
  };
  ////////////////////MOVE BOARD FUNCTIONs////////////////////////////////////////////////////////////

  const moveBoard = function (direction) {
    let row = state.board_row;
    let column = state.board_column;
    dispatch({ type: "MOVE_BOARD", row, column, direction });

    if (direction === "right") {
      column++;
    }
    if (direction === "left") {
      column--;
    }
    if (direction === "up") {
      row--;
    }
    if (direction === "down") {
      row++;
    }
    if (row < 0 || column < 0 || row > 20 || column > 20) {
      return;
    }
    // !state.data.cellDATA[row] && dispatch({type: "NEW_ROW"})
    state.cells[row][column].length < 1 &&
      dispatch({ type: "POPULATE_MAP", row, column });

    dispatch({ type: "MOVE_BOARD", row, column, direction });
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
    handleEquip,
    moveBoard,
    calculateDrop,
    state,
    players: state.players,
    cells: state.cells,
    display: state.display,
    selectedPlayer: state.selectedPlayer,
    feed: state.feed,
    terrainOptions: state.terrainOptions,
    board_column: state.board_column,
    board_row: state.board_row,
    droppableCells: state.droppableCells,
    boardDirectionAnimation: state.boardDirectionAnimation,
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
