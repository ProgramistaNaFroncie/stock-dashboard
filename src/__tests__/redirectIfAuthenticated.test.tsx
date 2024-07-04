import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { AppContext } from "@/App.context";
import { redirectIfAuthenticated } from "../hoc/redirectIfAuthenticated";
import { User } from "firebase/auth";
import { createMockUser } from "./utils/createMockRouter";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const TestComponent = () => <div data-testid="public">Public Component</div>;

describe("redirectIfAuthenticated HOC", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should redirect to / if user is authenticated", () => {
    const contextValue = {
      user: createMockUser(),
      userAlerts: [],
      setUserAlerts: jest.fn(),
      logout: jest.fn(),
    };

    const AuthRedirectComponent = redirectIfAuthenticated(TestComponent);

    render(
      <AppContext.Provider value={contextValue}>
        <AuthRedirectComponent />
      </AppContext.Provider>
    );

    expect(mockReplace).toHaveBeenCalledWith("/");
    expect(screen.queryByTestId("public")).not.toBeInTheDocument();
  });

  test("should render the component if user is not authenticated", () => {
    const contextValue = {
      user: null,
      userAlerts: [],
      setUserAlerts: jest.fn(),
      logout: jest.fn(),
    };

    const AuthRedirectComponent = redirectIfAuthenticated(TestComponent);

    render(
      <AppContext.Provider value={contextValue}>
        <AuthRedirectComponent />
      </AppContext.Provider>
    );

    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.getByTestId("public")).toBeInTheDocument();
  });
});
