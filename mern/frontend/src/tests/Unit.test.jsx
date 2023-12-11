import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import About from "../pages/About";

describe("About Page", () => {
  it("should render the About component", () => {
    render(<About />);
    expect(
      screen.getByText("Welcome to the Personal Budget App!")
    ).toBeInTheDocument();
  });
});
