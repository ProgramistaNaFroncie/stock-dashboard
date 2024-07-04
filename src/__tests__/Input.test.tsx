import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldError } from "react-hook-form";
import Input from "@/components/Input";

describe("Input Component", () => {
  const renderInput = (props: any) => {
    const utils = render(<Input {...props} />);
    const input = utils.getByLabelText(props.label) as HTMLInputElement;

    return { input, ...utils };
  };

  test("should render the input with label", () => {
    const { input } = renderInput({
      label: "Label",
      id: "id",
      type: "type",
      register: jest.fn(),
    });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "type");
  });

  test("should display error message", () => {
    const error: FieldError = {
      type: "required",
      message: "Email is required",
    };

    renderInput({
      label: "Label",
      id: "id",
      type: "type",
      register: jest.fn(),
      error,
    });

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("is-invalid");
  });

  test("should not display an error", () => {
    renderInput({
      label: "Label",
      id: "id",
      type: "type",
      register: jest.fn(),
    });

    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).not.toHaveClass("is-invalid");
  });

  test("should display proper placeholder", () => {
    const { input } = renderInput({
      label: "Label",
      id: "id",
      type: "type",
      register: jest.fn(),
      placeholder: "Enter your email",
    });

    expect(input).toHaveAttribute("placeholder", "Enter your email");
  });
});
