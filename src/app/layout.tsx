import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://skills-jmulikgiltnercoms-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "minisskills — installable skills for Minis",
    template: "%s · minisskills",
  },
  description:
    "Browse and download thousands of community-built skills for the Minis on-device AI agent. Every skill is packaged as a ready-to-install SKILL.md bundle.",
  keywords: [
    "Minis",
    "Open Minis",
    "AI skills",
    "SKILL.md",
    "AI agent",
    "skill directory",
  ],
  openGraph: {
    title: "minisskills — installable skills for Minis",
    description:
      "Browse and download community-built skills for the Minis on-device AI agent.",
    url: siteUrl,
    siteName: "minisskills",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "minisskills — installable skills for Minis",
    description:
      "Browse and download community-built skills for the Minis on-device AI agent.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#ee7b11" showSpinner={false} />
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
