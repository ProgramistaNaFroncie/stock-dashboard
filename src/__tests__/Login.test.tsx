import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/app/login/page";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/lib/firebase", () => ({
  auth: {},
}));

jest.mock("@/hoc/redirectIfAuthenticated", () => ({
  __esModule: true,
  redirectIfAuthenticated: jest.fn((component) => component),
}));

describe("Login Component", () => {
  const mockPush = jest.fn();
  const mockSignIn = signInWithEmailAndPassword as jest.Mock;

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

  test("should render the login form correctly", () => {
    render(<Login />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  test("should display validation errors", async () => {
    render(<Login />);

    fireEvent.click(screen.getByTestId("login-button"));

    expect(await screen.findAllByText(/is required/i)).toHaveLength(2);
  });

  test("should log in user properly", async () => {
    mockSignIn.mockResolvedValueOnce({});
    render(<Login />);

    setInputValue("email-input", "test@wp.pl");
    setInputValue("password-input", "password123");

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        auth,
        "test@wp.pl",
        "password123"
      );
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
