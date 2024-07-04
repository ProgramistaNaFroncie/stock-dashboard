import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../app/register/page";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/lib/firebase", () => ({
  auth: {},
}));

jest.mock("@/hoc/redirectIfAuthenticated", () => ({
  __esModule: true,
  redirectIfAuthenticated: jest.fn((component) => component),
}));

describe("Register Component", () => {
  const mockPush = jest.fn();
  const mockCreateUser = createUserWithEmailAndPassword as jest.Mock;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setInputValue = (testId: string, value: string) => {
    const input = screen.getByTestId(testId);

    fireEvent.change(input, { target: { value } });
  };

  test("should render the register form", () => {
    render(<Register />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
  });

  test("should display validation errors", async () => {
    render(<Register />);

    fireEvent.click(screen.getByTestId("register-button"));

    expect(await screen.findAllByText(/is required/i)).toHaveLength(2);
  });

  test("should show password error", async () => {
    render(<Register />);

    setInputValue("email-input", "test@wp.pl");
    setInputValue("password-input", "password123");
    setInputValue("confirm-password-input", "differentPassword");

    fireEvent.click(screen.getByTestId("register-button"));

    expect(
      await screen.findByText(/the passwords do not match/i)
    ).toBeInTheDocument();
  });

  test("should register user and redirects to /", async () => {
    mockCreateUser.mockResolvedValueOnce({});
    render(<Register />);

    setInputValue("email-input", "test@wp.pl");
    setInputValue("password-input", "password123");
    setInputValue("confirm-password-input", "password123");

    fireEvent.click(screen.getByTestId("register-button"));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        auth,
        "test@wp.pl",
        "password123"
      );
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
