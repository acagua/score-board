import { FC } from "react";
import { Game, Status } from "../App";
interface Props {
  games: Game[];
}

export const Results: FC<Props> = ({ games }) => {
  const finishedGames = games.filter((game) => game.status === Status.FINISHED);
  if (finishedGames.length === 0) {
    return null;
  }
  return (
    <section className="container" role="presentation">
      <h2>Results</h2>
      {finishedGames.map((game) => (
        <p key={game.timestamp}>
          {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
        </p>
      ))}
    </section>
  );
};
