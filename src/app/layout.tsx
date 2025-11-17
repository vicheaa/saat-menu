import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

// Bonus: Add SEO Meta Tags
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
      <body className={`${inter.className} bg-gray-50`}>
        <Header /> {/* Add the header here */}
        <main className="container mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
