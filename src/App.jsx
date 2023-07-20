////////////////////IMPORTs ////////////////////
import "./App.css";
import PlayArea from "./components/PlayArea";
import { StateProvider } from "./state/StateContext";

function App() {
  return (
    <StateProvider>
      <PlayArea />
    </StateProvider>
  );
}

export default App;
