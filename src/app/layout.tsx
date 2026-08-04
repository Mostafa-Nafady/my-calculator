import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Inter — clean, modern sans-serif loaded via `next/font/google`.
 * The CSS variable `--font-sans` is consumed by `globals.css`.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mountain Travel - Explore the Great Outdoors",
  description:
    "Embark on unforgettable mountain travel adventures with expert guides, alpine expeditions, and scenic trails. Discover the world's most breathtaking peaks.",
  keywords: [
    "mountain travel",
    "alpine adventures",
    "guided tours",
    "scenic trails",
    "hiking",
    "outdoor adventures",
  ],
  authors: [{ name: "Mountain Travel" }],
  openGraph: {
    title: "Mountain Travel - Explore the Great Outdoors",
    description:
      "Embark on unforgettable mountain travel adventures with expert guides, alpine expeditions, and scenic trails.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f3a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

