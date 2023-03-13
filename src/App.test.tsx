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

    const startButton = screen.getByRole("button", { name: /start/i });

    const sections = screen.getAllByRole("presentation");

    expect(sections).toHaveLength(1);

    expect(homeTeamInput).not.toHaveValue();
    expect(awayTeamInput).not.toHaveValue();
    expect(startButton).toBeDisabled();
  });

  it("Should render Playing when the first game starts", async () => {
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
    expect(startButton).toBeEnabled();

    await userEvent.click(startButton);

    expect(homeTeamInput).toHaveValue("");
    expect(awayTeamInput).toHaveValue("");

    const [, playing] = screen.getAllByRole("presentation");

    expect(playing).not.toBeEmptyDOMElement();

    screen.getByRole("heading", { name: /playing/i, level: 2 });

    const scoreButtons = screen.getAllByRole("button", {
      name: /score/i,
    });
    const finishButtonAfterRender = screen.getByRole("button", {
      name: /finish/i,
    });

    expect(scoreButtons).toHaveLength(2);
    expect(finishButtonAfterRender).toBeInTheDocument();
  });

  it("Should not render the started game if home team is not defined", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });

    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.clear(homeTeamInput);
    await userEvent.type(homeTeamInput, "Colombia");

    await userEvent.click(startButton);

    const sections = screen.getAllByRole("presentation");

    expect(sections).toHaveLength(1);

    const playingSectionHeading = screen.queryByRole("heading", {
      name: /playing/i,
      level: 2,
    });

    expect(playingSectionHeading).not.toBeInTheDocument();
  });

  it("Should not render the started game if home team is not defined", async () => {
    render(<App />);

    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });

    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.clear(awayTeamInput);
    await userEvent.type(awayTeamInput, "Brasil");

    await userEvent.click(startButton);

    const sections = screen.getAllByRole("presentation");

    expect(sections).toHaveLength(1);

    const playingSectionHeading = screen.queryByRole("heading", {
      name: /playing/i,
      level: 2,
    });

    expect(playingSectionHeading).not.toBeInTheDocument();
  });
});
