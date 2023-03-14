import { FC } from "react";
import { Game, Status } from "../App";

interface Props {
  games: Game[];
  updateGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

enum TeamScore {
  HOME = "homeScore",
  AWAY = "awayScore",
}

export const Playing: FC<Props> = ({ games, updateGames }) => {
  const playingGames = games.filter((game) => game.status === Status.PLAYING);
  if (playingGames.length === 0) {
    return null;
  }

  const handleOnScore = (timestamp: number, key: TeamScore) => {
    updateGames((prevGames) => {
      return prevGames.map((game) => {
        if (game.timestamp === timestamp) {
          return {
            ...game,
            [key]: game[key] + 1,
          };
        }
        return game;
      });
    });
  };

  const handleOnFinishGame = (timestamp: number) => {
    updateGames((prevGames) =>
      prevGames.map((game) => {
        if (game.timestamp === timestamp) {
          return {
            ...game,
            status: Status.FINISHED,
          };
        }
        return game;
      })
    );
  };

  return (
    <section className="container" role="presentation">
      <h2>Playing</h2>
      {playingGames.map((game) => (
        <div key={game.timestamp}>
          <p>
            {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
          </p>
          <button
            onClick={() => {
              handleOnScore(game.timestamp, TeamScore.HOME);
            }}
          >
            Score
          </button>
          <button
            onClick={() => {
              handleOnScore(game.timestamp, TeamScore.AWAY);
            }}
          >
            Score
          </button>
          <button onClick={() => handleOnFinishGame(game.timestamp)}>
            Finish
          </button>
        </div>
      ))}
    </section>
  );
};
