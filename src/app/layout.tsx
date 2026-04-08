import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/cartContext/CartContext";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Trends Store",
  description: "Your favourite fashion store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
