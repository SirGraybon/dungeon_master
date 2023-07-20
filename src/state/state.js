////////////////////IMPORTs ////////////////////
import React, { useReducer } from "react";
import data from "../data/data";

// const StateHook = function () {
 export const defaultState = {
    data: data,
    modalPlayer: "diceBowl",
    modalType: "",
    log: [],
    dice: [],
  };

  ////////////////////REDUCER SWITCH CASEs////////////////////
 export const reducer = function (state, action) {
    switch (action.type) {


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
    }
  };

  export default reducer

  ////////////////////useReducer////////////////////
  // const [state, dispatch] = useReducer(reducer, defaultState);

  ////////////////////FUNCTIONs////////////////////
  // const addDie = function (d) {
  //   dispatch({ type: "EDIT_DICE", die_type: d });
  // };
  // const rollDie = function (index) {
  //   dispatch({ type: "ROLL_DIE", index: index });
  // };
  // const clearDice = function(){
  //   dispatch({type: 'EDIT_DICE', die_type: "XX"})
  // }
  // const rollAllDice = function(){
    
  //   state.dice.forEach((die, index) => {
  //     if(die.status === "not_rolled"){

  //       rollDie(index)
  //     }
  //     });
  // }

  ////////////////////RETURN////////////////////

  // return {
  //   addDie,
  //   rollDie,
  //   clearDice,
  //   rollAllDice,
  //   state,
  // };
// };
// export default StateHook;
