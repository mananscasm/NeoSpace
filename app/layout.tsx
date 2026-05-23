import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.neospaceengineering.com"),
  title: {
    default: "NeoSpace Engineering | Solar EPC & Renewable Energy Solutions",
    template: "%s | NeoSpace Engineering"
  },
  description:
    "NeoSpace Engineering is a leading Solar EPC solution provider in India, delivering cost-effective solar, net zero, energy audit, O&M, and renewable energy consulting solutions since 2013.",
  keywords: [
    "NeoSpace Engineering",
    "solar EPC India",
    "renewable energy",
    "rooftop solar",
    "solar plant O&M",
    "net zero consulting",
    "energy audits",
    "Udaipur solar company"
  ],
  openGraph: {
    title: "NeoSpace Engineering | Providing Efficient Energy Solutions",
    description:
      "Solar EPC, renewable energy consulting, audits, O&M, and net zero advisory for commercial and industrial organizations.",
    url: "https://www.neospaceengineering.com",
    siteName: "NeoSpace Engineering",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 900,
        alt: "Solar plant installation"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoSpace Engineering",
    description: "Providing Efficient Energy Solutions"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-white font-sans text-graphite antialiased`}>
        {children}
      </body>
    </html>
  );
}
