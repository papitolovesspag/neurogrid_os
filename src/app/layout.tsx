import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuroGrid OS — AI Virtual Power Plant",
  description:
    "Autonomous operating system aggregating distributed energy resources to eliminate fossil peaker plants through sub-second neural dispatch and real-time grid stabilization.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 dark:bg-obsidian-950 dark:text-slate-100 min-h-screen selection:bg-grid-cyan selection:text-obsidian-950`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
