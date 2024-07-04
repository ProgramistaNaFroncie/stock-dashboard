import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { AppContext } from "@/App.context";
import { withAuth } from "../hoc/withAuth";
import { User } from "firebase/auth";
import { createMockUser } from "./utils/createMockRouter";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const TestComponent = () => (
  <div data-testid="protected">Component only for logged in users</div>
);

describe("withAuth", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should redirect to login if user is not authenticated", () => {
    const contextValue = {
      user: null,
      userAlerts: [],
      setUserAlerts: jest.fn(),
      logout: jest.fn(),
    };

    const ProtectedComponent = withAuth(TestComponent);

    render(
      <AppContext.Provider value={contextValue}>
        <ProtectedComponent />
      </AppContext.Provider>
    );

    expect(mockReplace).toHaveBeenCalledWith("/login");
    expect(screen.queryByTestId("protected")).not.toBeInTheDocument();
  });

  test("should render the component if user is authenticated", () => {
    const contextValue = {
      user: createMockUser(),
      userAlerts: [],
      setUserAlerts: jest.fn(),
      logout: jest.fn(),
    };

    const ProtectedComponent = withAuth(TestComponent);

    render(
      <AppContext.Provider value={contextValue}>
        <ProtectedComponent />
      </AppContext.Provider>
    );

    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.getByTestId("protected")).toBeInTheDocument();
  });
});
