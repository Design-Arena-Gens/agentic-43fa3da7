import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextPlay AI Business Automation",
  description:
    "Centralize intent detection, sales, support, payment, and call automation in a single AI workflow for your team.",
  metadataBase: new URL("https://agentic-43fa3da7.vercel.app"),
  openGraph: {
    title: "NextPlay AI Business Automation",
    description:
      "Route customer conversations through a unified automation engine that closes deals, supports customers, and schedules calls.",
    url: "https://agentic-43fa3da7.vercel.app",
    siteName: "NextPlay AI Business Automation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextPlay AI Business Automation",
    description:
      "Give your team an AI autopilot for sales, support, payments, and call scheduling.",
  },
  icons: {
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
