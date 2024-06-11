import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { Items } from "@/lib/context/Items";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crochet Market Tool",
  description: "Created by Jacob Velasquez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Items>
        <body className={inter.className}>
          <Navbar />
          <div className="p-8 px-16">{children}</div>
        </body>
      </Items>
    </html>
  );
}
