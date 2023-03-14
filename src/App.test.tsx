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

  it("Should not render the started game if home team is not defined", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });

    const startButton = screen.getByRole("button", { name: /start/i });

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

  it("Should not render the started game if away team is not defined", async () => {
    render(<App />);

    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });

    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.type(awayTeamInput, "Brazil");

    await userEvent.click(startButton);

    const sections = screen.getAllByRole("presentation");

    expect(sections).toHaveLength(1);

    const playingSectionHeading = screen.queryByRole("heading", {
      name: /playing/i,
      level: 2,
    });

    expect(playingSectionHeading).not.toBeInTheDocument();
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

    await userEvent.type(homeTeamInput, "Colombia");

    await userEvent.type(awayTeamInput, "Brazil");

    expect(homeTeamInput).toHaveValue("Colombia");
    expect(awayTeamInput).toHaveValue("Brazil");
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
    expect(finishButtonAfterRender).toBeVisible();
  });

  it("Should show score, add to home score and away score when correponding button is presssed, and should remove the game when finished ", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });
    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });
    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.type(homeTeamInput, "Colombia");
    await userEvent.type(awayTeamInput, "Brazil");
    await userEvent.click(startButton);

    const [scoreHome, scoreAway] = screen.getAllByRole("button", {
      name: /score/i,
    });

    screen.getByRole("heading", { name: /playing/i, level: 2 });

    screen.getByText(/Colombia 0 - 0 Brazil/);
    await userEvent.click(scoreHome);
    screen.getByText(/Colombia 1 - 0 Brazil/);
    await userEvent.click(scoreHome);
    screen.getByText(/Colombia 2 - 0 Brazil/);
    await userEvent.click(scoreAway);
    screen.getByText(/Colombia 2 - 1 Brazil/);

    const finishGame = screen.getByRole("button", {
      name: /finish/i,
    });

    await userEvent.click(finishGame);

    const playingHeading = screen.queryByRole("heading", {
      name: /playing/i,
      level: 2,
    });
    expect(playingHeading).not.toBeInTheDocument();
  });

  it("Should render Results when the first game finishes and hide Playing when no playing matches are left", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });
    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });
    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.type(homeTeamInput, "Colombia");
    await userEvent.type(awayTeamInput, "Brazil");
    await userEvent.click(startButton);

    const finishGame = screen.getByRole("button", {
      name: /finish/i,
    });

    await userEvent.click(finishGame);

    const resultsHeading = screen.getByRole("heading", {
      name: /results/i,
      level: 2,
    });
    expect(resultsHeading).toBeVisible();
    const [, result] = screen.getAllByRole("presentation");
    expect(result).not.toBeEmptyDOMElement();
  });

  it("Should render all sections when having a playing game and finished one", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });
    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });
    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.type(homeTeamInput, "Colombia");
    await userEvent.type(awayTeamInput, "Brazil");
    await userEvent.click(startButton);

    await userEvent.type(homeTeamInput, "Argentina");
    await userEvent.type(awayTeamInput, "Bolivia");
    await userEvent.click(startButton);

    const finishGames = screen.getAllByRole("button", {
      name: /finish/i,
    });

    await userEvent.click(finishGames[0]);

    const playingHeading = screen.getByRole("heading", {
      name: /playing/i,
      level: 2,
    });

    const resultsHeading = screen.getByRole("heading", {
      name: /results/i,
      level: 2,
    });

    const [, playing, result] = screen.getAllByRole("presentation");

    expect(playingHeading).toBeVisible();
    expect(resultsHeading).toBeVisible();
    expect(playing).not.toBeEmptyDOMElement();
    expect(result).not.toBeEmptyDOMElement();
  });

  it("Should be able to finish multiple games", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });
    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });
    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.type(homeTeamInput, "Colombia");
    await userEvent.type(awayTeamInput, "Brazil");
    await userEvent.click(startButton);

    await userEvent.type(homeTeamInput, "Argentina");
    await userEvent.type(awayTeamInput, "Bolivia");
    await userEvent.click(startButton);

    await userEvent.type(homeTeamInput, "España");
    await userEvent.type(awayTeamInput, "Holanda");
    await userEvent.click(startButton);

    const finishGames = screen.getAllByRole("button", {
      name: /finish/i,
    });

    await userEvent.click(finishGames[1]);
    await userEvent.click(finishGames[0]);
    await userEvent.click(finishGames[2]);

    const finishGamesAfterClean = screen.queryAllByRole("button", {
      name: /finish/i,
    });

    expect(finishGamesAfterClean).toHaveLength(0);
  });

  it("Should sort finished games by total score and then by most recent game", async () => {
    render(<App />);

    const homeTeamInput = screen.getByRole("textbox", { name: /home team/i });
    const awayTeamInput = screen.getByRole("textbox", { name: /away team/i });
    const startButton = screen.getByRole("button", { name: /start/i });

    await userEvent.type(homeTeamInput, "Mexico");
    await userEvent.type(awayTeamInput, "Canada");
    await userEvent.click(startButton);

    await userEvent.type(homeTeamInput, "Spain");
    await userEvent.type(awayTeamInput, "Brazil");
    await userEvent.click(startButton);

    await userEvent.type(homeTeamInput, "Germany");
    await userEvent.type(awayTeamInput, "France");
    await userEvent.click(startButton);

    await userEvent.type(homeTeamInput, "Uruguay");
    await userEvent.type(awayTeamInput, "Italy");
    await userEvent.click(startButton);

    await userEvent.type(homeTeamInput, "Argentina");
    await userEvent.type(awayTeamInput, "Australia");
    await userEvent.click(startButton);

    const [
      ,
      canadaScore,
      spainScore,
      brazilScore,
      germanyScore,
      franceScore,
      uruguayScore,
      italyScore,
      argentinaScore,
      australiaScore,
    ] = screen.getAllByRole("button", {
      name: /score/i,
    });

    const [
      mexCanFinish,
      espBraFinish,
      gerFraFinish,
      uruItaFinish,
      argAusFinish,
    ] = screen.getAllByRole("button", {
      name: /finish/i,
    });

    await userEvent.click(australiaScore);
    await userEvent.click(spainScore);
    await userEvent.click(canadaScore);
    await userEvent.click(argentinaScore);
    await userEvent.click(spainScore);
    await userEvent.click(spainScore);
    await userEvent.click(canadaScore);
    await userEvent.click(canadaScore);
    await userEvent.click(brazilScore);
    await userEvent.click(spainScore);
    await userEvent.click(spainScore);
    await userEvent.click(argentinaScore);
    await userEvent.click(canadaScore);
    await userEvent.click(spainScore);
    await userEvent.click(spainScore);
    await userEvent.click(argentinaScore);
    await userEvent.click(canadaScore);
    await userEvent.click(spainScore);
    await userEvent.click(germanyScore);
    await userEvent.click(franceScore);
    await userEvent.click(spainScore);
    await userEvent.click(brazilScore);
    await userEvent.click(spainScore);

    //Finish a set of matches
    await userEvent.click(mexCanFinish);
    await userEvent.click(espBraFinish);
    await userEvent.click(argAusFinish);

    await userEvent.click(germanyScore);
    await userEvent.click(franceScore);
    await userEvent.click(uruguayScore);
    await userEvent.click(uruguayScore);
    await userEvent.click(uruguayScore);
    await userEvent.click(uruguayScore);
    await userEvent.click(uruguayScore);
    await userEvent.click(uruguayScore);

    await userEvent.click(italyScore);
    await userEvent.click(italyScore);
    await userEvent.click(italyScore);
    await userEvent.click(italyScore);
    await userEvent.click(italyScore);
    await userEvent.click(italyScore);

    await userEvent.click(uruItaFinish);
    await userEvent.click(gerFraFinish);

    const playingHeading = screen.queryByRole("heading", {
      name: /playing/i,
      level: 2,
    });

    expect(playingHeading).not.toBeInTheDocument();

    const resultsHeading = screen.getByRole("heading", {
      name: /results/i,
      level: 2,
    });
    expect(resultsHeading).toBeVisible();

    const resultList = screen.getAllByRole("listitem");
    screen.logTestingPlaygroundURL();

    expect(resultList[0]).toHaveTextContent("Uruguay 6 - 6 Italy");
    expect(resultList[1]).toHaveTextContent("Spain 10 - 2 Brazil");
    expect(resultList[2]).toHaveTextContent("Mexico 0 - 5 Canada");
    expect(resultList[3]).toHaveTextContent("Argentina 3 - 1 Australia");
    expect(resultList[4]).toHaveTextContent("Germany 2 - 2 France");
  });
});
