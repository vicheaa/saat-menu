import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAAT Restaurant Menu",
  description: "Browse the delicious menu at SAAT.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50`}
        suppressHydrationWarning
      >
        <Header />
        <main className="container mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
