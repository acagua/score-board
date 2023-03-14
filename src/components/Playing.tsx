import { FC } from "react";
import { Game } from "../App";

interface Props {
  games: Game[];
  updateGames: React.Dispatch<React.SetStateAction<Game[]>>;
  finishGame: React.Dispatch<React.SetStateAction<Game[]>>;
}

export const Playing: FC<Props> = ({ games, updateGames, finishGame }) => {
  if (games.length === 0) {
    return null;
  }

  const handleOnScoreHome = (index: number) => {
    updateGames((prevGames) => {
      const updatedGames = [...prevGames];
      const selectedGame = { ...updatedGames[index] };
      updatedGames[index] = {
        ...selectedGame,
        homeScore: selectedGame.homeScore + 1,
      };

      return updatedGames;
    });
  };
  const handleOnScoreAway = (index: number) => {
    updateGames((prevGames) => {
      const updatedGames = [...prevGames];
      const selectedGame = { ...updatedGames[index] };
      updatedGames[index] = {
        ...selectedGame,
        awayScore: selectedGame.awayScore + 1,
      };

      return updatedGames;
    });
  };

  const handleOnFinishGame = (index: number) => {
    const finishedGame = games[index];
    updateGames((prevGames) =>
      prevGames.filter((game) => game.timestamp !== finishedGame.timestamp)
    );
    finishGame((prevFinishedGames) => [...prevFinishedGames, finishedGame]);
  };

  return (
    <section className="container" role="presentation">
      <h2>Playing</h2>
      {games.map((game, index) => (
        <div key={game.timestamp}>
          <p>
            {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
          </p>
          <button
            onClick={() => {
              handleOnScoreHome(index);
            }}
          >
            Score
          </button>
          <button
            onClick={() => {
              handleOnScoreAway(index);
            }}
          >
            Score
          </button>
          <button onClick={() => handleOnFinishGame(index)}>Finish</button>
        </div>
      ))}
    </section>
  );
};
