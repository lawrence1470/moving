import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import LocalBusinessSchema from "./components/LocalBusinessSchema";
import FAQSchema from "./components/FAQSchema";
import ServiceSchema from "./components/ServiceSchema";
import ReviewSchema from "./components/ReviewSchema";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://walkuppros.com"),
  title: {
    default: "Walk-up Pros | Evening Movers Manhattan (6PM-1AM)",
    template: "%s | Walk-up Pros",
  },
  description:
    "Manhattan evening moving service (6PM-1AM). Text for quote in <5 min. Walk-up apartment specialists. No hidden fees. (347) 617-2607",
  keywords: [
    "evening movers nyc",
    "manhattan movers",
    "walk-up apartment movers",
    "night movers manhattan",
    "nyc moving service",
    "after hours movers",
  ],
  authors: [{ name: "Walk-up Pros" }],
  creator: "Walk-up Pros",
  openGraph: {
    title: "Walk-up Pros - Evening Movers Manhattan",
    description:
      "Move after work. 6PM-1AM daily. Text for quote in under 5 minutes.",
    url: "https://walkuppros.com",
    siteName: "Walk-up Pros",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Walk-up Pros | Evening Movers Manhattan",
    description:
      "Manhattan evening moving service. Text for quote in <5 min. Walk-up specialists.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical assets for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/doodles/moving-truck.svg" as="image" type="image/svg+xml" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://walkuppros.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocalBusinessSchema />
        <FAQSchema />
        <ServiceSchema />
        <ReviewSchema />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
