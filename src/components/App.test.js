import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { BrowserRouter } from "react-router-dom";

describe("App render test", () => {
  it("Should render without error", () => {
    render(<App />, { wrapper: BrowserRouter });
    const linkElement = screen.getByText("Auto clicker");
    expect(linkElement).toBeInTheDocument();
  });
  it("The button redirects to game when username is filled", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const button = screen.getByRole("button", { name: "Start" });
    fireEvent.click(button);
    expect(screen.getByText(/Add username/).textContent).toBe("* Add username");
  });
  it("The counter shopuld increase when the add button is clicked", () => {
    window.scrollTo = jest.fn();
    render(<Game />, { wrapper: BrowserRouter });
    const button = screen.getByRole("button", { name: "Add Coins" });
    expect(screen.getByText(/total coins/).textContent.includes("0")).toBe(true);
    fireEvent.click(button);
    expect(screen.getByText(/total coins/).textContent.includes("1")).toBe(true);
    fireEvent.click(button);
    expect(screen.getByText(/total coins/).textContent.includes("2")).toBe(true);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
