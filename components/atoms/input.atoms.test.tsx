import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Input } from "./input.atoms";

describe("Input", () => {
  it("renders input with placeholder", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Search..." />);
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
