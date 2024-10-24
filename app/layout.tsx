import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rock Application - The Ultimate Music Management Tool",
  description: "An advanced application for managing and organizing your music collections, generated by the Rock App team"
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
