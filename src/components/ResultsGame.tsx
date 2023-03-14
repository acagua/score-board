import { FC } from "react";
import { Game } from "../App";

interface Props {
  game: Game;
}

export const ResultsGame: FC<Props> = ({ game }) => {
  return (
    <li>
      {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
    </li>
  );
};
