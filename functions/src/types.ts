export interface IStockData {
  symbol: string;
  name: string;
  percentChange: string;
  prices: IPrice[];
}

export interface IPrice {
  time: string;
  price: string;
}

export interface IAlphaVantageResponse {
  "Time Series (15min)": {
    [key: string]: {
      "1. open": string;
      "4. close": string;
    };
  };
}
