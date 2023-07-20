////////////////////IMPORTs ////////////////////
import "../styles/diceBowl.css";
// import StateHook from "../state/state";
import shareState from "../state/StateContext";

const DiceBowl = function (props) {
  // const {addDie, state, rollDie, clearDice, rollAllDice} = StateHook()
  const {    addDie,
    rollDie,
    clearDice,
    rollAllDice,
    state,} = shareState()






  ////////////////////COMPONENT FUNCTION RETURN //////////////////////////////////////////////
  return (
    <div className="diceBowlComponent">
      <div className="dice_options">
        <div className="dice_option" onClick={() => addDie(20)}>
          20
        </div>
        <div className="dice_option" onClick={() => addDie(12)}>
          12
        </div>
        <div className="dice_option" onClick={() => addDie(10)}>
          10
        </div>
        <div className="dice_option" onClick={() => addDie(8)}>
          8
        </div>
        <div className="dice_option" onClick={() => addDie(6)}>
          6
        </div>
        <div className="dice_option" onClick={() => addDie(4)}>
          4
        </div>
      </div>
      {/* <div className="total_roll"></div> */}
      <div className="dice_roll_area">
        {state.dice.map((die, index) => {
          return (
            <div className={die.status} key={die.die_key}>
              <div className="die_display_area">
                <p>D{die.die_type}</p>
                <p>{die.result}</p>
              </div>
              <div className="die_actions">
                <a>X</a>
                <div className="roll" onClick={() => rollDie(index)}>
                  Roll
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>

      <button onClick={() => clearDice()}> Clear Dice</button>
      <button onClick={() => rollAllDice()}> Roll all Dice</button>
      </div>
      {/* <div>{rollTotal}</div> */}
    </div>
  );
};

export default DiceBowl;
