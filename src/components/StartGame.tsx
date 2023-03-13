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

  const handleOnBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    setTeams({
      ...teams,
      [target.name]: target.value.trim(),
    });
  };

  const handleClick = () => {
    const newGame = {
      homeTeam: teams.home.trim(),
      homeScore: 0,
      awayTeam: teams.away.trim(),
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
        onBlur={handleOnBlur}
      />
      <label htmlFor="awayTeam">Away Team</label>
      <input
        id="awayTeam"
        name="away"
        type="text"
        value={teams.away}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <button
        onClick={handleClick}
        disabled={!Boolean(teams.away) || !Boolean(teams.home)}
      >
        Start
      </button>
    </section>
  );
};
