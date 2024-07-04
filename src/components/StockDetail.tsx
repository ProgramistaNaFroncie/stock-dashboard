"use client";

import React, { useMemo } from "react";
import { IStockData } from "@/app/indexes/types";
import { Chart, AxisOptions } from "react-charts";

const StockDetail = ({ stock }: { stock: IStockData }) => {
  const data = useMemo(
    () => [
      {
        label: "Price",
        data: stock.prices.map((price) => ({
          primary: new Date(price.time),
          secondary: Number(price.price),
        })),
      },
    ],
    [stock.prices]
  );

  const primaryAxis = useMemo<
    AxisOptions<{ primary: Date; secondary: number }>
  >(
    () => ({
      getValue: (data) => data.primary,
      scaleType: "time",
      formatters: {
        scale: (time) =>
          new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
    }),
    []
  );

  const secondaryAxes = useMemo<
    AxisOptions<{ primary: Date; secondary: number }>[]
  >(
    () => [
      {
        getValue: (data) => data.secondary,
        elementType: "line",
        formatters: {
          scale: (data: number) => `$${data}`,
          tooltip: (data?: number) => <div>${data?.toFixed(2)}</div>,
        },
      },
    ],
    []
  );

  return (
    <div className="w-100 mt-40 text-black" style={{ height: "300px" }}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          dark: true,
          getSeriesStyle: () => ({
            stroke: "rgba(255, 97, 190, 0.8)",
            fill: "rgba(255, 97, 190, 0.8)",
          }),
        }}
      />
    </div>
  );
};

export default StockDetail;
