import React from "react";
import Link from "next/link";
import CreateAlert from "@/components/CreateAlert";
import { IStockData } from "@/app/indexes/types";
import { fetchStockData } from "@/app/indexes/fetchData";

const Alerts = async () => {
  const stockData: IStockData[] = await fetchStockData();

  return (
    <section className="container py-40">
      <Link href="/alerts" className="text-pink">
        {"<"} Your Alerts
      </Link>
      <h1 className="mt-24">Create an Alert</h1>
      <CreateAlert stockData={stockData} />
    </section>
  );
};

export default Alerts;
