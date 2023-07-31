////////////////////IMPORTs ////////////////////////////////////////////////////////////
import React, { useReducer } from "react";
import data from "../data/data";
import grass from "../assets/terrain/grass.png";
import dirt from "../assets/terrain/dirt.png";
import shareState from "./StateContext";

// const StateHook = function () {
export const defaultState = {
  data: data,
  board_column: 0,
  board_row: 0,
  selectedPlayer: "diceBowl",
  display: "minimap",
  feed: [],
  dice: [],
  terrainOptions: [grass, dirt],
  terrainBrush: null,
  user: "DungeonMaster",
};

////////////////////DATE / TIME VARIABLEs////////////////////////////////////////////////////////////
const year = new Date().getFullYear(); //To get the Current Year
const months = [
  "placeholder",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]; // Months as strings
const month = new Date().getMonth() + 1; //To get the Current Month
const day = new Date().getDate(); //To get the Current Day
const hours = new Date().getHours(); //To get the Current Hours
const min = new Date().getMinutes(); //To get the Current Minutes
const sec = new Date().getSeconds(); //To get the Current Secondsconsole.log(date)

////////////////////REDUCER SWITCH CASEs////////////////////////////////////////////////////////////
export const reducer = function (state, action) {
  switch (action.type) {
    ////////////////////DICE////////////////////////////////////////////////////////////
    case "EDIT_DICE": {
      return {
        ...state,
        dice: action.payload,
      };
    }

    case "ROLL_DIE": {
      return {
        ...state,
        dice: action.payload,
      };
    }
    ////////////////////DATA////////////////////////////////////////////////////////////
    case "UPDATE_DATA": {
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
      };
    }
    ////////////////////DISPLAY////////////////////////////////////////////////////////////
    case "SET_DISPLAY": {
      if (action.displayType !== "player") {
        return {
          ...state,
          display: action.displayType,
        };
      }
      return {
        ...state,
        display: action.displayType,
        selectedPlayer: action.player,
      };
    }
    ////////////////////TERRAIN////////////////////////////////////////////////////////////

    case "EDIT_TERRAIN": {
      const newData = { ...state.data };
      newData.cellDATA[state.board_row][state.board_column][
        action.payload
      ].background = state.terrainBrush;

      return {
        ...state,
        data: newData,
      };
    }
    case "SET_TERRAIN_BRUSH": {
      const brush = action.payload;
      return { ...state, terrainBrush: brush };
    }
    ////////////////////MOVE BOARD////////////////////////////////////////////////////////////
    case "MOVE_BOARD": {
      return { ...state, board_row: action.row, board_column: action.column };
    }
    // case "NEW_ROW":{
    //   const newData = {...state.data}
    //   const cells = [[]]
    //   for (let i = 0; i < 400; i++) {
    //     cells[0].push({ id: `${i}`, content: [], background: grass });
    //   }
    //   newData.cellDATA.push(cells)
    //   console.log(newData.cellDATA)
    //   return {...state, cata: newData }
    // }
    // case "NEW_COLUMN":{
    //   const newData = {...state.data}
    //   const cells = []
    //   for (let i = 0; i < 400; i++) {
    //     cells.push({ id: `${i}`, content: [], background: grass });
    //   }
    //   newData.cellDATA[action.row].push(cells)
    //   return {...state, cata: newData }
    // }
    case "POPULATE_MAP": {
      const newData = { ...state.data };
      for (let i = 0; i < 400; i++) {
        newData.cellDATA[action.row][action.column].push({ id: `${i}`, content: [], background: grass });
      }
      // console.log(newData.cellDATA)
      return { ...state, data: newData };
    }
    ////////////////////FEED////////////////////////////////////////////////////////////
    case "POST_MESSAGE": {
      let dateStamp;
      const getDate = function () {
        return (dateStamp = `${months[month]}, ${day} ${year}`);
      };
      let timeStamp;
      const getTime = function () {
        return (timeStamp = `${hours}:${min}:${sec}`);
      };
      getDate();
      getTime();
      const currentFeed = [...state.feed];
      const feedUpdate = {
        event: action.payload,
        time: timeStamp,
        postType: action.postType,
        user: state.user,
      };
      const todayIndex = currentFeed.findIndex(
        (item) => item.day === dateStamp
      );
      console.log(todayIndex);
      if (todayIndex === -1) {
        currentFeed.push({ day: dateStamp, feed: [feedUpdate] });
      } else {
        currentFeed[todayIndex].feed.push(feedUpdate);
      }
      return {
        ...state,
        feed: currentFeed,
      };
    }
  }
};

export default reducer;
