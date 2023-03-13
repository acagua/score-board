import { FC } from "react";
import { Game } from "../App";

interface Props {
  games: Game[];
}

export const Playing: FC<Props> = ({ games }) => {
  if (games.length === 0) {
    return null;
  }
  return (
    <section className="container" role="presentation">
      <h2>Playing</h2>
      {games.map((game) => (
        <>
          <p>
            {game.homeTeam} - {game.awayTeam}
          </p>
          <button> Score </button>
          <button> Score </button>
          <button>Finish</button>
        </>
      ))}
    </section>
  );
};
