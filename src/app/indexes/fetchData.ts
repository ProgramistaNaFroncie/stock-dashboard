import path from "path";
import fs from "fs";
import {
  IAlphaVantageResponse,
  IAlphaVantageResponseMetadata,
  IStockData,
} from "./types";
import { ALPHAVANTAGE_API_KEY, USE_MOCKS } from "@/config";

const readMockData = <T>(symbol: string, metadata?: boolean): T => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "mocks",
    `${symbol}${metadata ? "_meta" : ""}.json`
  );
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const fetchAlphaVantageData = async (
  symbol: string
): Promise<IAlphaVantageResponse> => {
  if (USE_MOCKS) {
    return readMockData<IAlphaVantageResponse>(symbol);
  }

  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=${ALPHAVANTAGE_API_KEY}`,
    { next: { revalidate: 86400 } } //trigger revalidate every 24 hours
  );
  const data = (await response.json()) as IAlphaVantageResponse;

  return data;
};

const fetchStockMetadata = async (symbol: string): Promise<string> => {
  if (USE_MOCKS) {
    const data = readMockData<IAlphaVantageResponseMetadata>(symbol, true);

    const bestMatch = data.bestMatches.find(
      (match) => match["1. symbol"] === symbol
    );

    return bestMatch ? bestMatch["2. name"] : symbol;
  }

  const response = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`
  );

  const data = (await response.json()) as IAlphaVantageResponseMetadata;

  const bestMatch = data.bestMatches.find(
    (match) => match["1. symbol"] === symbol
  );

  return bestMatch ? bestMatch["2. name"] : symbol;
};

export const fetchStockData = async (): Promise<IStockData[]> => {
  const SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA"];

  const stockDataPromises = SYMBOLS.map(async (symbol) => {
    const [stockData, companyName] = await Promise.all([
      fetchAlphaVantageData(symbol),
      fetchStockMetadata(symbol),
    ]);

    const timeSeriesData = stockData["Time Series (15min)"];

    const allDates = Object.keys(timeSeriesData);

    const sortedDates = allDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const latestDate = sortedDates.reduce((latest, current) => {
      const latestDateOnly = latest.split(" ")[0];
      const currentDateOnly = current.split(" ")[0];
      return currentDateOnly > latestDateOnly
        ? currentDateOnly
        : latestDateOnly;
    }, "");

    const latestDayData = sortedDates.filter((time) =>
      time.startsWith(latestDate)
    );

    if (latestDayData.length === 0) {
      return {
        symbol: symbol,
        name: companyName,
        percentChange: "0",
        prices: [],
      };
    }

    const prices = latestDayData.map((time) => ({
      time: time,
      price: timeSeriesData[time]["4. close"],
    }));

    const firstPrice = parseFloat(timeSeriesData[latestDayData[0]]["1. open"]);
    const lastPrice = parseFloat(
      timeSeriesData[latestDayData[latestDayData.length - 1]]["4. close"]
    );
    const change = lastPrice - firstPrice;
    const percentChange = ((change / firstPrice) * 100).toFixed(2);

    return {
      symbol: symbol,
      name: companyName,
      percentChange: percentChange,
      prices: prices,
    };
  });

  const stockData = await Promise.all(stockDataPromises);

  return stockData;
};
