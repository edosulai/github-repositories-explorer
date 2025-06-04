import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./input.atoms";

// Test suite for Input component
describe("Input Component", () => {
  // Test case: Component renders with placeholder
  it("renders input with placeholder", () => {
    render(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  // Test case: Component handles value changes correctly
  it("handles value changes", () => {
    const onChangeMock = jest.fn();
    render(<Input value="" onChange={onChangeMock} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(onChangeMock).toHaveBeenCalled();
  });

  // Test case: Component applies custom classes
  it("applies custom className properly", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  // Test cases for various input states and attributes
  it("handles disabled state", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("handles readonly state", () => {
    render(<Input readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");
  });

  it("handles required attribute", () => {
    render(<Input required />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("handles type attribute", () => {
    render(
      <div>
        <label htmlFor="password">Password</label>
        <Input type="password" id="password" />
      </div>
    );
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("handles focus events", () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();

    render(<Input onFocus={onFocusMock} onBlur={onBlurMock} />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(onFocusMock).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlurMock).toHaveBeenCalled();
  });

  it("maintains default styling while allowing custom classes", () => {
    render(<Input className="additional-class" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("p-4");
    expect(input).toHaveClass("mb-4");
    expect(input).toHaveClass("border");
    expect(input).toHaveClass("border-gray-300");
    expect(input).toHaveClass("rounded-3xl");
    expect(input).toHaveClass("additional-class");
  });
});
