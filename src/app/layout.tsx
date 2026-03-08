import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PSGMX Forks | Open Source Community",
  description:
    "PSGMX Forks — Open Source Community by 25MXians of PSG College of Technology, Department of Computer Applications.",
  keywords: [
    "reactjs",
    "nextjs",
    "react",
    "next",
    "modern-ui",
    "modern-ux",
    "portfolio",
    "gsap",
    "animated",
    "animated-ui",
    "game-website",
    "gaming-website",
    "postcss",
    "prettier",
    "tailwindcss",
    "tailwindcss-animate",
    "ui/ux",
    "js",
    "javascript",
    "typescript",
    "eslint",
    "html",
    "css",
    "ts",
  ],
  authors: [
    {
      name: "Tino Britty J",
      url: "https://github.com/brittytino",
    },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/ico" },
      { url: "/icon1.png", sizes: "16x16", type: "image/png" },
      { url: "/icon2.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "theme-color": "#010103",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
