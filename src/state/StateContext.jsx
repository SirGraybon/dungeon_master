////////////////////IMPORTs ////////////////////
import { createContext, useContext, useReducer } from "react";
import reducer, { defaultState } from "./state";

const StateContext = createContext(defaultState);
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
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
  const value = {
    addDie,
    rollDie,
    clearDice,
    rollAllDice,
    state,
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
