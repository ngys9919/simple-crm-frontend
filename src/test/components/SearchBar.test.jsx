// Component Test: SearchBar.jsx
// src/components/SearchBar.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

describe("SearchBar", () => {
  it("renders the current searchTerm as the input value", () => {
    // Arrange + Act: render with searchTerm already set to "Ada";
    // onSearch is unused in this test, so a no-op function is enough
    render(<SearchBar searchTerm="Ada" onSearch={() => {}} />);
    // Assert: the input's value reflects the searchTerm prop
    expect(
      screen.getByPlaceholderText("Search by name or email..."),
    ).toHaveValue("Ada");
  });

  it("calls onSearch with the new value when the user types", () => {
    // Arrange: a mock function so the test can inspect how it was called
    const onSearch = vi.fn();
    render(<SearchBar searchTerm="" onSearch={onSearch} />);

    // Act: simulate typing "Turing" into the input
    const input = screen.getByPlaceholderText("Search by name or email...");
    fireEvent.change(input, { target: { value: "Turing" } });

    // Assert: SearchBar called onSearch with the new text,
    // not whether the input's value changed on screen (it doesn't own that state)
    expect(onSearch).toHaveBeenCalledWith("Turing");
  });
});
