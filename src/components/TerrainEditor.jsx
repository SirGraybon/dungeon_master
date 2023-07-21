import "../styles/terrainEditor.css";
import shareState from "../state/StateContext";

const TerrainEditor = function () {
  const { terrainOptions, setTerrainBrush } = shareState();
  return (
    <div className="terrainEditor">
      {terrainOptions.map((option) => {
        return <img className="terrainOption" src={option} onClick={() => setTerrainBrush(option)} />;
      })}
      <button  className="terrainOption" onClick={() => setTerrainBrush(null)}>Clear</button>
    </div>
  );
};

export default TerrainEditor;
