import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Некрасово поле | АгроПарк и онлайн-бронирование", description: "Современный цифровой сервис АгроПарка Некрасово поле: парк, зоны отдыха, бронирование, AI-чат, контакты и панель команды.", keywords: ["АгроПарк Некрасово поле", "Некрасово поле", "гриль-купола", "Калининград", "AI чат", "бронирование"] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body className="font-sans antialiased">{children}</body></html>; }
