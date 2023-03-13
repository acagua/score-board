import { FC, SetStateAction, useState } from "react";
import { Game } from "../App";

interface Props {
  startGame: React.Dispatch<SetStateAction<Game[]>>;
}

const initialState = {
  home: "",
  away: "",
};
export const StartGame: FC<Props> = ({ startGame }) => {
  const [teams, setTeams] = useState(initialState);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTeams({
      ...teams,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    const newGame = {
      homeTeam: teams.home,
      homeScore: 0,
      awayTeam: teams.away,
      awayScore: 0,
      timestamp: new Date().getTime(),
    };
    startGame((games) => [...games, newGame]);
    setTeams(initialState);
  };
  return (
    <section className="container" role="presentation">
      <h2>Start a Game</h2>
      <label htmlFor="homeTeam">Home Team</label>
      <input
        id="homeTeam"
        name="home"
        type="text"
        value={teams.home}
        onChange={handleOnChange}
      />
      <label htmlFor="awayTeam">Away Team</label>
      <input
        id="awayTeam"
        name="away"
        type="text"
        value={teams.away}
        onChange={handleOnChange}
      />
      <button onClick={handleClick}> Start </button>
    </section>
  );
};
