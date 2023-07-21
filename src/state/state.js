////////////////////IMPORTs ////////////////////////////////////////////////////////////
import React, { useReducer } from "react";
import data from "../data/data";

// const StateHook = function () {
 export const defaultState = {
    data: data,
    selectedPlayer: "diceBowl",
    display: "",
    feed: [],
    dice: [],
  };

  ////////////////////DATE / TIME VARIABLEs////////////////////////////////////////////////////////////
  const months = ["placeholder", "Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const date = new Date().getDate(); //To get the Current Date
  const month = new Date().getMonth() + 1; //To get the Current Month
  const year = new Date().getFullYear(); //To get the Current Year
  const hours = new Date().getHours(); //To get the Current Hours
  const min = new Date().getMinutes(); //To get the Current Minutes
  const sec = new Date().getSeconds(); //To get the Current Secondsconsole.log(date)

  const dateStamp = `${months[month]}, ${date} ${year}`
  const timeStamp = `${hours}:${min}:${sec}`
  console.log(dateStamp)
  console.log(timeStamp)


 

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
        const currentFeed = [...state.feed];
        let targetDie = currentDice[action.index];
        targetDie.result = Math.floor(Math.random() * targetDie.die_type) + 1;
        const feedUpdate = {event:`User rolled a D${targetDie.die_type}. Result: ${targetDie.result}`,
      dateStamp, timeStamp}
        currentFeed.push(feedUpdate)
        targetDie.status = "rolled";
        return {
          ...state,
          dice: currentDice,
          feed: currentFeed
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
  
  