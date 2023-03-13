import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Score Board", () => {
  it("Should render App with the initial state", () => {
    render(<App />);

    screen.getByRole("heading", {
      name: /world cup score board/i,
      level: 1,
    });

    screen.getByRole("heading", { name: /start a game/i, level: 2 });

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });
    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });

    screen.getByRole("button", { name: /start/i });

    const sections = screen.getAllByRole("presentation");

    expect(sections).toHaveLength(1);

    expect(homeTeamInput).not.toHaveValue();
    expect(awayTeamInput).not.toHaveValue();
  });

  it("Should render Playing the first game starts", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });
    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });

    const startButton = screen.getByRole("button", { name: /start/i });

    const scoreButton = screen.queryByRole("button", { name: /score/i });
    const finishButton = screen.queryByRole("button", { name: /finish/i });

    expect(scoreButton).not.toBeInTheDocument();
    expect(finishButton).not.toBeInTheDocument();

    await userEvent.clear(homeTeamInput);
    await userEvent.type(homeTeamInput, "Colombia");

    await userEvent.clear(awayTeamInput);
    await userEvent.type(awayTeamInput, "Brasil");

    expect(homeTeamInput).toHaveValue("Colombia");
    expect(awayTeamInput).toHaveValue("Brasil");

    await userEvent.click(startButton);

    expect(homeTeamInput).toHaveValue("");
    expect(awayTeamInput).toHaveValue("");

    const [, playing] = screen.getAllByRole("presentation");

    expect(playing).not.toBeEmptyDOMElement();

    screen.getByRole("heading", { name: /playing/i, level: 2 });
  });
});
