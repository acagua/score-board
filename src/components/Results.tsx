import { FC } from "react";
import { Game, Status } from "../App";
import { ResultsGame } from "./ResultsGame";
interface Props {
  games: Game[];
}

export const Results: FC<Props> = ({ games }) => {
  const finishedGames = games.filter((game) => game.status === Status.FINISHED);
  if (finishedGames.length === 0) {
    return null;
  }

  const sortedGames = finishedGames.sort(
    (oldGame, newGame) =>
      newGame.homeScore +
        newGame.awayScore -
        (oldGame.homeScore + oldGame.awayScore) ||
      newGame.timestamp - oldGame.timestamp
  );

  return (
    <section className="container" role="presentation">
      <h2>Results</h2>
      <ul>
        {sortedGames.map((game) => (
          <ResultsGame key={game.timestamp} game={game} />
        ))}
      </ul>
    </section>
  );
};
