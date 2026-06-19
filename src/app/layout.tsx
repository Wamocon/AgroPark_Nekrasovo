import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroPark Nekrasovo | Digitale Transformation",
  description:
    "Weniger Aufwand. Mehr Buchungen. Bessere Übersicht. Die moderne digitale Plattform für AgroPark Nekrasovo.",
  keywords: ["AgroPark", "Nekrasovo", "Agritourismus", "Digitale Transformation", "KI-Chatbot"],
  authors: [{ name: "WAMOCON GmbH" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
