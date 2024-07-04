import React, { useContext } from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "@/App";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "@/lib/firebase";
import { AppContext } from "@/App.context";
import { createMockUser } from "./utils";

jest.mock("@firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("@/scss/main.scss", () => ({}));

jest.mock("@/lib/firebase", () => ({
  auth: {},
}));

describe("App Component", () => {
  const mockUser = createMockUser();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show loading spinner on start", async () => {
    let authCallback: any;
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      authCallback = callback;
      return jest.fn();
    });

    render(
      <App>
        <div>Test</div>
      </App>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    act(() => {
      authCallback(null);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
  });

  test("shoukd render children with context", async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    render(
      <App>
        <div data-testid="children">Test</div>
      </App>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  test("should logout properly", async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    const TestComponent = () => {
      const { logout } = useContext(AppContext);

      return (
        <div>
          <button data-testid="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      );
    };

    render(
      <App>
        <TestComponent />
      </App>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("logout-button"));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledWith(auth);
    });
  });
});
