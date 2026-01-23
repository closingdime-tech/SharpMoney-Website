import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SharpMoney | +EV Sports Betting Tools",
  description: "Professional-grade +EV betting tools. Find value before the market moves. Sharp books, line movement data, and the fastest odds engine in the industry.",
  keywords: ["sports betting", "+EV betting", "sharp betting", "betting tools", "odds comparison", "line movement"],
  openGraph: {
    title: "SharpMoney | +EV Sports Betting Tools",
    description: "Stop guessing. Follow the market. Professional-grade +EV betting tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
