import { FC } from "react";

export const StartGame: FC = () => {
  return (
    <section className="container" role="presentation">
      <h2>Start a Game</h2>
      <label htmlFor="homeTeam">Home Team</label>
      <input id="homeTeam" type="text" />
      <label htmlFor="awayTeam">Away Team</label>
      <input id="awayTeam" type="text" />
      <button> Start </button>
    </section>
  );
};
