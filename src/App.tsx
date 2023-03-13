import { useState } from "react";
import { StartGame } from "./components/StartGame";
import { Playing } from "./components/Playing";
import { Results } from "./components/Results";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>World Cup score board</h1>
      <section className="container" role="presentation">
        <StartGame />
      </section>
      <section className="container" role="presentation">
        <Playing />
      </section>
      <section className="container" role="presentation">
        <Results />
      </section>
    </div>
  );
}

export default App;
