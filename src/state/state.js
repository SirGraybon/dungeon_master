////////////////////IMPORTs ////////////////////////////////////////////////////////////
import React, { useReducer } from "react";
import data from "../data/data";
import grass from "../assets/terrain/grass.png";
import dirt from "../assets/terrain/dirt.png";
import shareState from "./StateContext";

// const StateHook = function () {
export const defaultState = {
  data: data,
  selectedPlayer: "diceBowl",
  display: "",
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

const dateStamp = `${months[month]}, ${day} ${year}`;
const timeStamp = `${hours}:${min}:${sec}`;
console.log(dateStamp);
console.log(timeStamp);

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
      newData.cellDATA[action.payload].background = state.terrainBrush;

      return {
        ...state,
        data: newData,
      };
    }
    case "SET_TERRAIN_BRUSH": {
      const brush = action.payload;
      return { ...state, terrainBrush: brush };
    }
    ////////////////////FEED////////////////////////////////////////////////////////////
    case "POST_MESSAGE": {
      const currentFeed = [...state.feed];
      const feedUpdate = {
        event: action.payload,
        timeStamp,
        postType: action.postType,
        user: state.user

      };
      currentFeed.push(feedUpdate);
      return {
        ...state,
        feed: currentFeed,
      };
    }
  }
};

export default reducer;
