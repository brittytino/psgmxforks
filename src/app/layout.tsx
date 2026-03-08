import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PSGMX Forks | Open Source Community — PSG College of Technology",
  description:
    "PSGMX Forks is an open source community by 25MXians — students of the Department of Computer Applications, PSG College of Technology, Coimbatore. We build and contribute free, open source software to the global developer community.",
  keywords: [
    // Community & identity
    "PSGMX Forks",
    "25MXians",
    "PSG College of Technology",
    "PSG Tech",
    "PSG Tech Coimbatore",
    "Department of Computer Applications",
    "MCA students",
    "student open source community",
    "Coimbatore",
    "Tamil Nadu",
    "India open source",
    // Open source
    "open source",
    "open source community",
    "open source contributions",
    "free software",
    "GitHub community",
    "developer community",
    "open source projects",
    "software contributions",
    "collaborative development",
    "community-driven",
    // Tech stack
    "reactjs",
    "nextjs",
    "typescript",
    "javascript",
    "tailwindcss",
    "gsap",
    "nodejs",
    "web development",
    "full stack",
    "frontend development",
    // SEO / discoverability
    "student developers",
    "college tech community",
    "open source India",
    "PSG open source",
    "psgmxforks",
    "brittytino",
  ],
  authors: [
    {
      name: "Tino Britty J",
      url: "https://github.com/brittytino",
    },
  ],
  creator: "Tino Britty J",
  publisher: "PSGMX Forks",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://github.com/brittytino/psgmxforks",
    siteName: "PSGMX Forks",
    title: "PSGMX Forks | Open Source Community — PSG College of Technology",
    description:
      "Open source community by 25MXians of PSG College of Technology, Coimbatore. Building free software for the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PSGMX Forks | Open Source Community",
    description:
      "Open source community by 25MXians of PSG College of Technology, Coimbatore.",
    creator: "@brittytino",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
