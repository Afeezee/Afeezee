import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { GeoBackdrop } from "@/components/GeoBackdrop";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://www.afeezee.com";
const description =
  "Afeez Ayomide Olagunju — musician, writer, researcher, developer, startup founder, mental health advocate. One name, six disciplines.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Afeezee — Afeez Ayomide Olagunju",
    template: "%s · Afeezee",
  },
  description,
  keywords: [
    "Afeezee",
    "Afeez Ayomide Olagunju",
    "Cereus Technologies",
    "Jude Mental Health Society",
    "Osun State",
    "deepfake detection",
    "musician",
    "writer",
    "researcher",
    "developer",
    "founder",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Afeezee — musician, writer, researcher, developer, founder, advocate",
    description,
    siteName: "Afeezee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afeezee",
    description,
  },
  robots: { index: true, follow: true },
};

const themeInit = `
(function () {
  try {
    var stored = localStorage.getItem('afeezee-theme');
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersLight ? 'light' : 'dark');
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <GeoBackdrop />
        {children}
      </body>
    </html>
  );
}
