import {
 BarChart3,
 CalendarCheck,
 FileText,
 MapPinned,
 MessageSquareText,
 Sparkles,
 Ticket,
 Users,
} from "lucide-react";

export const agroparkContact = {
 phone: "+7 (911) 474-30-04",
 phoneHref: "tel:+79114743004",
 email: "info@agroparknp.ru",
 emailHref: "mailto:info@agroparknp.ru",
 region: "Kaliningrader Oblast",
 season: "Mai bis September",
};

export const demoAccounts = [
 { role: "Admin", email: "admin@agropark.demo", scope: "Voller CRM-Zugriff" },
 { role: "Manager", email: "manager@agropark.demo", scope: "Buchungen und KPI" },
 { role: "Staff", email: "staff@agropark.demo", scope: "Tagesbetrieb" },
 { role: "Visitor", email: "visitor@agropark.demo", scope: "Besucheransicht" },
];

export const operationsKpis = [
 { label: "Heute Buchungen", value: "47", change: "+12%", icon: Ticket },
 { label: "Live-Umsatz", value: "€2.840", change: "+€340", icon: BarChart3 },
 { label: "Auslastung", value: "78%", change: "+5%", icon: CalendarCheck },
 { label: "Neue Anfragen", value: "12", change: "+3", icon: MessageSquareText },
];

export const recentActivity = [
 { user: "Max K.", action: "buchte Familienticket", time: "vor 2 Min.", amount: "€34" },
 { user: "Anna L.", action: "reservierte Grillplatz", time: "vor 5 Min.", amount: "€120" },
 { user: "Sergej B.", action: "startete VR-Tour", time: "vor 8 Min.", amount: "Info" },
 { user: "Elena V.", action: "fragte Gruppenrabatt an", time: "vor 12 Min.", amount: "Lead" },
];

export const productModules = [
 {
 title: "Online-Buchung",
 metric: "3 Schritte",
 text: "Termin, Tickets, QR-Referenz und lokale Demo-Speicherung.",
 href: "/buchung",
 action: "Buchung testen",
 icon: CalendarCheck,
 },
 {
 title: "CRM-Dashboard",
 metric: "4 Rollen",
 text: "Demo-Login, KPIs, Aktivitätsfeed und operative Schnellaktionen.",
 href: "/login",
 action: "Einloggen",
 icon: BarChart3,
 },
 {
 title: "KI-Assistenz",
 metric: "24/7",
 text: "Webchat mit Fallback-Antworten für Preise, Saison und Parkinfos.",
 href: "/kontakt",
 action: "Chat öffnen",
 icon: MessageSquareText,
 },
 {
 title: "Pitch Deck",
 metric: "Board-ready",
 text: "Problem, Lösung, KPIs, Technologie, Roadmap und Investitionslogik.",
 href: "/proposal.html",
 action: "Pitch öffnen",
 icon: FileText,
 },
];

export const parkZones = [
 { name: "Maislabyrinth", x: 16, y: 18, w: 34, h: 28, tone: "#d7edc6" },
 { name: "Maschinenmuseum", x: 57, y: 18, w: 25, h: 20, tone: "#e8dfcc" },
 { name: "Tierbereich", x: 12, y: 58, w: 26, h: 22, tone: "#d8efe7" },
 { name: "Restaurant", x: 46, y: 56, w: 18, h: 18, tone: "#f0dcc4" },
 { name: "Grillkuppeln", x: 70, y: 54, w: 18, h: 24, tone: "#eadfbe" },
];

export const heroActions = [
 { label: "Buchung testen", href: "/buchung", icon: Ticket },
 { label: "Demo-Login", href: "/login", icon: Users },
 { label: "Pitch Deck", href: "/proposal.html", icon: Sparkles },
 { label: "Park ansehen", href: "/park", icon: MapPinned },
];
