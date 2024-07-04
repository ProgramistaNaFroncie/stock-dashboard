export interface IAlphaVantageResponse {
  "Time Series (15min)": {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

export interface IAlphaVantageResponseMetadata {
  bestMatches: {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
  }[];
}

export interface IPrice {
  time: string;
  price: string;
}

export interface IStockData {
  symbol: string;
  name: string;
  percentChange: string;
  prices: IPrice[];
}

export interface IStockMetadataResponse {
  bestMatches: {
    "2. name": string;
  }[];
}
