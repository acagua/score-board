import { FC } from "react";

export const StartGame: FC = () => {
  return (
    <>
      <h2>Start a Game</h2>
      <label htmlFor="homeTeam">Home Team</label>
      <input id="homeTeam" type="text" />
      <label htmlFor="awayTeam">Away Team</label>
      <input id="awayTeam" type="text" />
      <button> Start </button>
    </>
  );
};
