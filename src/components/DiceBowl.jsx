import "../styles/diceBowl.css";

const DiceBowl = function (props) {
  return (
    <div className="diceBowlComponent">
      <div className="dice_options">
        <div className="dice_option"></div>
        <div className="dice_option"></div>
        <div className="dice_option"></div>
        <div className="dice_option"></div>
        <div className="dice_option"></div>
        <div className="dice_option"></div>
      </div>
      <div className="dice_roll_area"></div>
    </div>
  );
};

export default DiceBowl;
