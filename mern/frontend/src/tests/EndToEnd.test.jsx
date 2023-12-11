import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Signup from "../pages/Signup";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("axios");

describe("Signup Component", () => {
  it("submits the form and navigates on successful signup", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "testpassword" },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    });
    await waitFor(() => expect(window.location.pathname).toBe("/"));
  });
});
