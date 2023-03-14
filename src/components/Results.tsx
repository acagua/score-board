import { FC } from "react";
import { Game } from "../App";
interface Props {
  games: Game[];
}

export const Results: FC<Props> = ({ games }) => {
  if (games.length === 0) {
    return null;
  }
  return (
    <section className="container" role="presentation">
      <h2>Results</h2>
      {games.map((game) => (
        <p key={game.timestamp}>
          {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
        </p>
      ))}
    </section>
  );
};
