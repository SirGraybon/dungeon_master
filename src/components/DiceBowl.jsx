import { useState } from "react";
import "../styles/diceBowl.css";

const DiceBowl = function (props) {
  const {dice, setDice} = props;

  const addDie = function (d) {
    let keyCounter = dice.length;
    const currentDice = [...dice];
    currentDice.push({
      die_key: keyCounter,
      die_type: d,
      result: 0,
      status: "not_rolled",
    });

    setDice(currentDice);
  };

  const rollDie = function (index) {
    const currentDice = [...dice];
    let targetDie = currentDice[index];
    targetDie.result = Math.floor(Math.random() * targetDie.die_type) + 1;
    targetDie.status = "rolled";
    setDice(currentDice);
  };
  return (
    <div className="diceBowlComponent">
      <div className="dice_options">
        <div className="dice_option" onClick={() => addDie(20)}>
          20
        </div>
        <div className="dice_option" onClick={() => addDie(12)}>12</div>
        <div className="dice_option" onClick={() => addDie(10)}>10</div>
        <div className="dice_option" onClick={() => addDie(8)}>8</div>
        <div className="dice_option" onClick={() => addDie(6)}>6</div>
        <div className="dice_option" onClick={() => addDie(4)}>4</div>
      </div>
      {/* <div className="total_roll"></div> */}
      <div className="dice_roll_area">
        {dice.map((die, index) => {
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
    </div>
  );
};

export default DiceBowl;
