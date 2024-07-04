import React from "react";
import AuthContainer from "@/components/AuthContainer";
import StockList from "@/components/StockList";
import { fetchStockData } from "./fetchData";
import { IStockData } from "./types";

const Indexes = async () => {
  const stockData: IStockData[] = await fetchStockData();

  return (
    <AuthContainer>
      <section className="container py-40">
        <h1 className="mb-32">Stock Indexes</h1>
        <StockList stockData={stockData} />
      </section>
    </AuthContainer>
  );
};

export default Indexes;
