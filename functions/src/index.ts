import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createTransport } from "nodemailer";

admin.initializeApp();
const db = admin.firestore();

const mockStockData = {
  "Meta Data": {
    "1. Information":
      "Intraday (15min) open, high, low, close prices and volume",
    "2. Symbol": "AAPL",
    "3. Last Refreshed": "2024-07-01 19:45:00",
    "4. Interval": "15min",
    "5. Output Size": "Compact",
    "6. Time Zone": "US/Eastern",
  },
  "Time Series (15min)": {
    "2024-07-01 19:45:00": {
      "1. open": "216.6200",
      "2. high": "216.7200",
      "3. low": "216.5300",
      "4. close": "216.6000",
      "5. volume": "20612",
    },
  },
};

export const checkStockPrices = functions.pubsub
  .schedule("every 15 minutes")
  .onRun(async () => {
    const alertsRef = db.collection("alerts");
    const alertDocs = await alertsRef.get();

    const latestPrice = getLatestPrice(mockStockData);

    alertDocs.forEach(async (doc) => {
      const { symbol, price, direction, email, name } = doc.data();
      const currentPrice = latestPrice[symbol];

      if (
        (direction === "above" && currentPrice > price) ||
        (direction === "below" && currentPrice < price)
      ) {
        await sendEmailAlert(email, symbol, currentPrice, direction, name);
      }
    });
  });

const getLatestPrice = (stockData: any) => {
  const timeSeries = stockData["Time Series (15min)"];
  const latestTime = Object.keys(timeSeries)[0];
  const latestPrice = parseFloat(timeSeries[latestTime]["4. close"]);
  const symbol = stockData["Meta Data"]["2. Symbol"];
  return { [symbol]: latestPrice };
};

const sendEmailAlert = async (
  email: string,
  symbol: string,
  currentPrice: number,
  direction: string,
  name?: string
) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "testing@gmail.com",
      pass: "testing123#",
    },
  });

  const mailOptions = {
    from: "testing@gmail.com",
    to: email,
    subject: `Stock (${symbol}) Update!`,
    text: `${name || symbol} is ${direction} the price of ${currentPrice}`,
  };

  await transporter.sendMail(mailOptions);
};
