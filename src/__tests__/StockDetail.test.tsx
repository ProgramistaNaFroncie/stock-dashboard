import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StockDetail from "../components/StockDetail";
import { IStockData } from "@/app/indexes/types";

jest.mock("react-charts", () => ({
  Chart: (props: any) => <div data-testid="chart">{JSON.stringify(props)}</div>,
}));

const mockStockData: IStockData = {
  symbol: "AAPL",
  name: "Apple Inc.",
  percentChange: "2.34",
  prices: [
    { time: "2023-07-01T10:00:00Z", price: "145.23" },
    { time: "2023-07-01T10:15:00Z", price: "146.34" },
    { time: "2023-07-01T10:30:00Z", price: "147.45" },
  ],
};

describe("StockDetail Component", () => {
  test("should render chart with correct data", () => {
    render(<StockDetail stock={mockStockData} />);

    const chart = screen.getByTestId("chart");
    expect(chart).toBeInTheDocument();

    const chartProps = JSON.parse(chart.textContent || "");
    expect(chartProps.options.data[0].label).toBe("Price");
    expect(chartProps.options.data[0].data).toEqual([
      { primary: "2023-07-01T10:00:00.000Z", secondary: 145.23 },
      { primary: "2023-07-01T10:15:00.000Z", secondary: 146.34 },
      { primary: "2023-07-01T10:30:00.000Z", secondary: 147.45 },
    ]);
  });
});
