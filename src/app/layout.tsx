import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({weight: '400', subsets: ["latin"], display: 'swap', });

export const metadata: Metadata = {
  title: "SPMS",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
