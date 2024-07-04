import React from "react";
import Link from "next/link";
import { IStockData } from "@/app/indexes/types";
import Arrow from "@/icons/Arrow";

const StockList = ({ stockData }: { stockData: IStockData[] }) => {
  return (
    <div className="container px-0">
      <div className="row">
        {stockData.map((stock) => (
          <Link
            href={`/indexes/${stock.symbol}`}
            passHref
            className="col-12 col-lg-4 mb-24"
            key={stock.symbol}
          >
            <div className="card d-flex align-items-center flex-row">
              <div className="card-body p-16">
                <h5 className="card-title text-white">
                  {stock.name} ({stock.symbol})
                </h5>
                <p className="card-text text-white fs-12">
                  Percent Change:{" "}
                  <span
                    className={
                      Number(stock.percentChange) < 0
                        ? "text-red"
                        : "text-green"
                    }
                  >
                    {Math.abs(Number(stock.percentChange))}%
                  </span>
                </p>
              </div>
              <div className="mr-16">
                <Arrow />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StockList;
