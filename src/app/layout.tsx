import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ChatWidget } from "@/components/chat/chat-widget";

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
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
