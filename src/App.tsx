import { useState } from "react";
import { StartGame } from "./components/StartGame";
import { Playing } from "./components/Playing";
import { Results } from "./components/Results";

import "./App.css";

export interface Game {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  timestamp: number;
}

function App() {
  const [playingGames, setPlayingGames] = useState<Game[]>([]);
  return (
    <div className="App">
      <h1>World Cup score board</h1>
      <StartGame startGame={setPlayingGames} />
      <Playing games={playingGames} />
      <Results games={[]} />
    </div>
  );
}

export default App;
