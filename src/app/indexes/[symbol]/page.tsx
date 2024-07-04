import React from "react";
import { fetchStockData } from "@/app/indexes/fetchData";
import { IStockData } from "@/app/indexes/types";
import AuthContainer from "@/components/AuthContainer";
import StockDetail from "@/components/StockDetail";
import Link from "next/link";
import Button from "@/components/Button";

enum ButtonVariants {
  "primary",
  "secondary",
}

const StockPage = async ({ params }: { params: { symbol: string } }) => {
  const stockData: IStockData[] = await fetchStockData();
  const stock = stockData.find((stock) => stock.symbol === params.symbol);
  const stockDetailsDate = stock?.prices[0].time.split(" ")[0];

  return stock ? (
    <AuthContainer>
      <section className="container py-40">
        <Link href="/indexes" className="text-pink">
          {"<"} List of indexes
        </Link>
        <h1 className="mt-24">
          {stock.name} ({stock.symbol})
        </h1>
        <p className="mb-4">{stockDetailsDate}</p>
        <p>
          Last 24h:{" "}
          <span
            className={
              Number(stock.percentChange) < 0 ? "text-red" : "text-green"
            }
          >
            {Math.abs(Number(stock.percentChange))}%
          </span>
        </p>
        <StockDetail stock={stock} />

        <h2 className="mt-80 mb-24 fs-32">
          Want to Stay Updated on Price Changes?
        </h2>
        <Button
          href={`/alerts/new?symbol=${stock.symbol}`}
          variant={ButtonVariants.secondary}
        >
          Create an alert!
        </Button>
      </section>
    </AuthContainer>
  ) : (
    <AuthContainer>
      <section className="container py-40">
        <Link href="/indexes" className="text-pink">
          {"<"} List of indexes
        </Link>
        <h1 className="mt-24">Index does not exist</h1>
      </section>
    </AuthContainer>
  );
};

export default StockPage;
