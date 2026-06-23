import type { Metadata, Viewport } from "next";
import { ChatWidget } from "@/components/chat/chat-widget";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgroPark Nekrasovo | CRM, Buchung und Pitch Demo",
  description:
    "Modern visitor website for Nekrasovo Pole with park information, grill house booking, multilingual AI chat and a separate premium pitch deck.",
  keywords: [
    "AgroPark Nekrasovo",
    "Kaliningrad",
    "Agritourismus",
    "AI Chat",
    "Online booking",
  ],
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
    <html lang="de" data-scroll-behavior="smooth" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
