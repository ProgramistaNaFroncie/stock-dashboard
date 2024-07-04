import React from "react";
import Link from "next/link";
import { fetchStockData } from "@/app/indexes/fetchData";
import { IStockData } from "@/app/indexes/types";
import EditAlert from "@/components/EditAlert";

const StockPage = async ({ params }: { params: { id: string } }) => {
  const stockData: IStockData[] = await fetchStockData();

  return (
    <section className="container py-40">
      <Link href="/alerts" className="text-pink">
        {"<"} Your Alerts
      </Link>
      <h1 className="mt-24">Edit Your Alert</h1>
      <EditAlert id={params.id} stockData={stockData} />
    </section>
  );
};

export default StockPage;
