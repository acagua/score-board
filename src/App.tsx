import { useState } from "react";
import { StartGame } from "./components/StartGame";
import { Playing } from "./components/Playing";
import { Results } from "./components/Results";

import "./App.css";

export enum Status {
  PLAYING = "playing",
  FINISHED = "finished",
}
export interface Game {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: Status;
  timestamp: number;
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  return (
    <>
      <h1>World Cup score board</h1>
      <div className="app">
        <StartGame startGame={setGames} />
        <Playing games={games} updateGames={setGames} />
        <Results games={games} />
      </div>
    </>
  );
}

export default App;
