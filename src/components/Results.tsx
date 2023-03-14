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
      <ul>
        {finishedGames
          .sort(
            (firstGame, secondGame) =>
              secondGame.homeScore +
                secondGame.awayScore -
                (firstGame.homeScore + firstGame.awayScore) ||
              secondGame.timestamp - firstGame.timestamp
          )
          .map((game) => (
            <li key={game.timestamp}>
              {game.homeTeam} {game.homeScore} - {game.awayScore}{" "}
              {game.awayTeam}
            </li>
          ))}
      </ul>
    </section>
  );
};
