import type { Metadata } from "next";
import App from "@/App";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Stock Dashboard",
  description: "Stock Dashboard Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-gray">
        <App>
          <div className="d-flex mx-24 my-16 app-container align-items-stretch border-full wide">
            <Navigation />
            <main className="px-24 py-16 w-100 mb-80">{children}</main>
          </div>
        </App>
      </body>
    </html>
  );
}
