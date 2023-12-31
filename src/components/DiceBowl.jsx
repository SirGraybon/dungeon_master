////////////////////IMPORTs ////////////////////
import "../styles/diceBowl.css";
// import StateHook from "../state/state";
import shareState from "../state/StateContext";

const DiceBowl = function (props) {
  const { editDice, rollDie, clearDice, rollAllDice, state } = shareState();

  ////////////////////COMPONENT FUNCTION RETURN //////////////////////////////////////////////
  return (
    <div className="diceBowlComponent">
      <div className="dice_options">
        <div className="dice_option" onClick={() => editDice(20)}>
          <img className="dieIcon" src="../assets/icons/d20.png"/>
        
        </div>
        <div className="dice_option" onClick={() => editDice(12)}>
          12
        </div>
        <div className="dice_option" onClick={() => editDice(10)}>
          10
        </div>
        <div className="dice_option" onClick={() => editDice(8)}>
          8
        </div>
        <div className="dice_option" onClick={() => editDice(6)}>
          6
        </div>
        <div className="dice_option" onClick={() => editDice(4)}>
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
        <button onClick={() => editDice("XX")}> Clear Dice</button>
        <button onClick={() => rollAllDice()}> Roll all Dice</button>
      </div>
      {/* <div>{rollTotal}</div> */}
    </div>
  );
};

export default DiceBowl;
