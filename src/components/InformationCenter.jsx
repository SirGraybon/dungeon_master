import shareState from "../state/StateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DiceBowl from "./DiceBowl";
import PlayerDetails from "./PlayerDetails";
import TerrainEditor from "./TerrainEditor";
import "../App.css"
import MiniMap from "./MiniMap";
import PlayerList from "./PlayerList";

export default function InformationCenter() {
  const { players, cells, display, setDisplay } = shareState();

  return (
    <div className="information_center">
      <PlayerList/>
      <div className="option_bar">
        <button onClick={() => setDisplay("diceBowl", null)}> Dice Bowl</button>
        <button onClick={() => setDisplay("terrain", null)}> Terrain Editor</button>
        <button onClick={() => setDisplay("minimap", null)}> Minimap</button>
      </div>
      {display === "player" && <PlayerDetails />}
      {display === "diceBowl" && <DiceBowl />}
      {display === "terrain" && <TerrainEditor />}
      {display === "minimap" && <MiniMap />}
    </div>
  );
}
