import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Score Board", () => {
  it("Should render App component", () => {
    render(<App />);
  });
});
