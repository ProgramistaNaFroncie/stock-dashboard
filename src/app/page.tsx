import React from "react";
import News from "@/components/News";
import { fetchStockData } from "./indexes/fetchData";
import { IStockData } from "./indexes/types";
import AuthContainer from "@/components/AuthContainer";
import clsx from "clsx";
import Link from "next/link";

const Home = async () => {
  const stockData: IStockData[] = await fetchStockData();

  return (
    <AuthContainer>
      <section className="container py-40">
        <h1 className="mb-32">Overview</h1>
        <div className="row">
          <div className="col-8">
            <div className="border-full p-16">
              <h3 className="mb-32">Recent News:</h3>
              <News
                title="Apple Odnotowuje Rekordowy Wzrost Akcji"
                text="Apple Inc. osiągnęło nowy rekord cen akcji po ogłoszeniu lepszych niż oczekiwano wyników finansowych za drugi kwartał."
              />
              <News
                title="Tesla Wprowadza Nowy Model Elektrycznego SUV-a"
                text="Tesla Inc. zapowiedziała wprowadzenie na rynek nowego modelu SUV-a, co spowodowało wzrost wartości akcji o 7% na otwarciu giełdy."
              />
              <News
                title="Amazon Przejmuje Firmę Zajmującą się AI"
                text="Amazon.com Inc. ogłosił przejęcie firmy specjalizującej się w sztucznej inteligencji, co ma na celu rozszerzenie ich technologicznych możliwości."
              />
              <News
                title="Microsoft Inwestuje w Zieloną Energię"
                text="Microsoft Corp. zapowiedział dużą inwestycję w projekty związane z odnawialnymi źródłami energii, co spotkało się z pozytywnym odbiorem inwestorów."
              />
              <News
                title="Google Wdraża Nowe Funkcje Prywatności"
                text="Alphabet Inc., spółka matka Google, ogłosiła wprowadzenie nowych funkcji prywatności, co przyczyniło się do wzrostu zaufania inwestorów i wzrostu cen akcji."
              />
            </div>
          </div>
          <div className="col-4">
            <div className="border-full p-16">
              <h3 className="mb-32">Top Earners:</h3>
              {stockData
                .sort(
                  (a, b) => Number(b.percentChange) - Number(a.percentChange)
                )
                .map((stock) => (
                  <div
                    className="d-flex align-items-center mb-12 justify-content-between"
                    key={stock.symbol}
                  >
                    <div className="d-flex flex-column">
                      <span>
                        {stock.name} {`(${stock.symbol})`}
                      </span>
                      <span>{stock.prices[0].price}</span>
                    </div>
                    <div
                      className={clsx("index-percent", {
                        low: Number(stock.percentChange) < 0,
                      })}
                    >
                      {"% "}
                      {Math.abs(Number(stock.percentChange)).toFixed(2)}
                    </div>
                  </div>
                ))}
              <Link className="bold text-pink mt-32 d-block" href="/indexes">
                View All Stock Indexes {">"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AuthContainer>
  );
};

export default Home;
