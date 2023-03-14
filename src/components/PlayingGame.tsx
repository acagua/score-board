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
    <>
      <p>
        {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
      </p>
      <button
        onClick={() => {
          updateScore(game.timestamp, TeamScore.HOME);
        }}
      >
        Score
      </button>
      <button
        onClick={() => {
          updateScore(game.timestamp, TeamScore.AWAY);
        }}
      >
        Score
      </button>
      <button onClick={() => finishGame(game.timestamp)}>Finish</button>
    </>
  );
};
