import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Game from "./pages/Game";
import { BrowserRouter } from "react-router-dom";

describe("App render test", () => {
  it("Should render without error", () => {
    render(<App />, { wrapper: BrowserRouter });
    const linkElement = screen.getByText("Auto clicker");
    expect(linkElement).toBeInTheDocument();
  });
  it("The counter shopuld increase when the add button is clicked", () => {
    render(<Game />, { wrapper: BrowserRouter });
    const button = screen.getByRole("button", { name: "Add Coins" });
    expect(screen.getByText(/total coins/).textContent.includes("0")).toBe(true);
    fireEvent.click(button);
    expect(screen.getByText(/total coins/).textContent.includes("1")).toBe(true);
    fireEvent.click(button);
    expect(screen.getByText(/total coins/).textContent.includes("2")).toBe(true);
  });
});
