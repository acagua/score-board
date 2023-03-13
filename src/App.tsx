import { useState } from "react";
import { StartGame } from "./components/StartGame";
import { Playing } from "./components/Playing";
import { Results } from "./components/Results";

import "./App.css";

function App() {
  const [showPlaying, setShowPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  return (
    <div className="App">
      <h1>World Cup score board</h1>
      <StartGame />
      {showPlaying && <Playing />}
      {showResults && <Results />}
    </div>
  );
}

export default App;
