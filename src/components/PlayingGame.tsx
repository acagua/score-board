import { FC } from "react";
import { Game } from "../App";
import { TeamScore } from "./Playing";

interface Props {
  game: Game;
  updateScore: (timestamp: number, key: TeamScore) => void;
  finishGame: (timestamp: number) => void;
}

export const PlayingGame: FC<Props> = ({ game, updateScore, finishGame }) => {
  return (
    <div className="playing">
      <p className="teams">
        {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
      </p>
      <button
        className="homeBtn"
        onClick={() => {
          updateScore(game.timestamp, TeamScore.HOME);
        }}
      >
        Score
      </button>
      <button
        className="awayBtn"
        onClick={() => {
          updateScore(game.timestamp, TeamScore.AWAY);
        }}
      >
        Score
      </button>
      <button className="finishBtn" onClick={() => finishGame(game.timestamp)}>
        Finish
      </button>
    </div>
  );
};
