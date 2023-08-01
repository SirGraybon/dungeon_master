////////////////////IMPORTs ////////////////////////////////////////////////////////////
import React, { useReducer } from "react";
import data from "../data/data";
import grass from "../assets/terrain/grass.png";
import dirt from "../assets/terrain/dirt.png";
import shareState from "./StateContext";

// const StateHook = function () {
export const defaultState = {
  data: data,
  board_column: 10,
  board_row: 10,
  selectedPlayer: "diceBowl",
  display: "minimap",
  feed: [],
  dice: [],
  terrainOptions: [grass, dirt],
  terrainBrush: null,
  user: "DungeonMaster",
};

////////////////////DATE / TIME VARIABLEs////////////////////////////////////////////////////////////
let months = [
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
let year;
let month;
let day;
let hours;
let min;
let sec;

const updateDateTime = function () {
  year = new Date().getFullYear(); //To get the Current Year
  month = new Date().getMonth() + 1; //To get the Current Month
  day = new Date().getDate(); //To get the Current Day
  hours = new Date().getHours(); //To get the Current Hours
  min = new Date().getMinutes(); //To get the Current Minutes
  sec = new Date().getSeconds(); //To get the Current Secondsconsole.log(date)
};

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
    
    case "POPULATE_MAP": {
      const newData = { ...state.data };
      for (let i = 0; i < 400; i++) {
        for (let i = 0; i < 400; i++) {
          const roll = Math.floor(Math.random() * 10) + 1;
          let background = dirt;
          if (roll > 1) {
            background = grass;
          }
          newData.cellDATA[action.row][action.column].push({
            id: `${i}`,
            content: [],
            background,
          });
        }
        // console.log(newData.cellDATA)
        return { ...state, data: newData };
      }
    }
    ////////////////////FEED////////////////////////////////////////////////////////////
    case "POST_MESSAGE": {
      updateDateTime();
      
      const dateStamp = `${months[month]}, ${day} ${year}`;
      const timeStamp = `${hours}:${min}:${sec}`;
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
