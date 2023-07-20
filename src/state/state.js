////////////////////IMPORTs ////////////////////////////////////////////////////////////
import React, { useReducer } from "react";
import data from "../data/data";

// const StateHook = function () {
 export const defaultState = {
    data: data,
    selectedPlayer: "diceBowl",
    display: "",
    log: [],
    dice: [],
  };

  ////////////////////REDUCER SWITCH CASEs////////////////////////////////////////////////////////////
 export const reducer = function (state, action) {
    switch (action.type) {

////////////////////DICE////////////////////////////////////////////////////////////
case "EDIT_DICE": {
  let keyCounter = state.dice.length;
  const currentDice = [...state.dice];
  if (action.die_type === "XX"){
    return {
      ...state,
      dice: []
    }
  }
  
  if (currentDice.length < 9) {
    currentDice.push({
      die_key: keyCounter,
            die_type: action.die_type,
            result: 0,
            status: "not_rolled",
          });
          console.log(currentDice);
        }
        return {
          ...state,
          dice: currentDice,
        };
      }
      
      case "ROLL_DIE": {
        const currentDice = [...state.dice];
        let targetDie = currentDice[action.index];
        targetDie.result = Math.floor(Math.random() * targetDie.die_type) + 1;
        targetDie.status = "rolled";
        return {
          ...state,
          dice: currentDice,
        };
      }
      ////////////////////DATA////////////////////////////////////////////////////////////
      case "UPDATE_DATA": {
        console.log(action.payload)
        return {
          ...state,
          data: action.payload
        }
      }
      ////////////////////DISPLAY////////////////////////////////////////////////////////////
      case "SET_DISPLAY": {
        if (action.displayType !== "player"){
          return {
            ...state,
            display: action.displayType
          }
        }
        return {
          ...state,
          display: action.displayType,
          selectedPlayer: action.player
        }
      }
    }
  };
  
  export default reducer
  
  