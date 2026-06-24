import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Некрасово поле | АгроПарк digital beta", description: "Современная beta-платформа АгроПарка Некрасово поле: сайт, бронирование, AI-чат, CRM-панель и аналитика команды.", keywords: ["АгроПарк Некрасово поле", "Некрасово поле", "гриль-купола", "Калининград", "AI чат", "бронирование"] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body className="font-sans antialiased">{children}</body></html>; }
