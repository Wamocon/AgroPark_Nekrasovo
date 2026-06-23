"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Ticket, Check, ArrowRight, CreditCard, Minus, Plus } from "lucide-react";

const MAX_TICKET_QUANTITY = 20;

const ticketTypes = [
 { id: "adult", name: "Erwachsener", price: 4.5, description: "Ab 16 Jahren" },
 { id: "child", name: "Kind", price: 2.5, description: "3-15 Jahre" },
 { id: "family", name: "Familienticket", price: 12, description: "2 Erwachsene + 2 Kinder" },
 { id: "group", name: "Gruppenführung", price: 45, description: "Bis 10 Personen inkl. Guide" },
];

function formatDateInput(date: Date) {
 const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
 return local.toISOString().slice(0, 10);
}

function getSeasonWindow(reference = new Date()) {
 const currentYear = reference.getFullYear();
 const currentSeasonStart = new Date(currentYear, 4, 1);
 const currentSeasonEnd = new Date(currentYear, 8, 30);
 const seasonYear = reference > currentSeasonEnd ? currentYear + 1 : currentYear;
 const seasonStart = new Date(seasonYear, 4, 1);
 const seasonEnd = new Date(seasonYear, 8, 30);
 const min = reference < currentSeasonStart || reference > currentSeasonEnd ? seasonStart : reference;

 return {
 minDate: formatDateInput(min),
 maxDate: formatDateInput(seasonEnd),
 label: `1. Mai bis 30. September ${seasonYear}`,
 };
}

function generateBookingRef() {
 const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
 let ref = "AP-";
 for (let i = 0; i < 8; i++) {
 ref += chars.charAt(Math.floor(Math.random() * chars.length));
 }
 return ref;
}

function SimpleQR({ value }: { value: string }) {
 // Deterministic pseudo-random grid based on the value string
 const cells = 25;
 const grid = useMemo(() => {
 const seed = value.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
 const rng = (n: number) => {
 const x = Math.sin(seed + n) * 10000;
 return x - Math.floor(x);
 };
 const rows: boolean[][] = [];
 for (let r = 0; r < cells; r++) {
 const row: boolean[] = [];
 for (let c = 0; c < cells; c++) {
 // Keep finder-like corners empty-ish
 const corner =
 (r < 5 && c < 5) || (r < 5 && c >= cells - 5) || (r >= cells - 5 && c < 5);
 row.push(!corner && rng(r * cells + c) > 0.55);
 }
 rows.push(row);
 }
 // Add corner markers
 const markCorner = (sr: number, sc: number) => {
 for (let r = 0; r < 7; r++) {
 for (let c = 0; c < 7; c++) {
 const border = r === 0 || r === 6 || c === 0 || c === 6;
 const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
 rows[sr + r][sc + c] = border || inner;
 }
 }
 };
 markCorner(0, 0);
 markCorner(0, cells - 7);
 markCorner(cells - 7, 0);
 return rows;
 }, [value]);

 const size = 192;
 const cellSize = size / cells;

 return (
 <svg
 viewBox={`0 0 ${size} ${size}`}
 className="h-full w-full rounded-lg"
 aria-label={`QR-Code für Buchung ${value}`}
 >
 <rect width={size} height={size} fill="white" />
 {grid.map((row, r) =>
 row.map(
 (filled, c) =>
 filled && (
 <rect
 key={`${r}-${c}`}
 x={c * cellSize}
 y={r * cellSize}
 width={cellSize}
 height={cellSize}
 fill="#1B4332"
 />
 )
 )
 )}
 </svg>
 );
}

export default function BookingPage() {
 const seasonWindow = useMemo(() => getSeasonWindow(), []);
 const [step, setStep] = useState(1);
 const [date, setDate] = useState("");
 const [quantities, setQuantities] = useState<Record<string, number>>({});
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [bookingRef, setBookingRef] = useState("");

 const total = ticketTypes.reduce(
 (sum, t) => sum + (quantities[t.id] || 0) * t.price,
 0
 );
 const hasTickets = total > 0;
 const isDateInSeason =
 !date || (date >= seasonWindow.minDate && date <= seasonWindow.maxDate);

 function handleQty(id: string, delta: number) {
 setQuantities((prev) => ({
 ...prev,
 [id]: Math.min(MAX_TICKET_QUANTITY, Math.max(0, (prev[id] || 0) + delta)),
 }));
 }

 function handleSubmit(e: React.FormEvent) {
 e.preventDefault();
 if (!date || !isDateInSeason || !hasTickets || !name.trim() || !email.trim()) return;

 const ref = generateBookingRef();
 const trimmedName = name.trim();
 const normalizedEmail = email.trim().toLowerCase();
 setBookingRef(ref);
 setName(trimmedName);
 setEmail(normalizedEmail);
 // Demo: persist booking locally
 try {
 const bookings = JSON.parse(localStorage.getItem("agropark_bookings") || "[]");
 bookings.push({
 id: ref,
 date,
 name: trimmedName,
 email: normalizedEmail,
 quantities,
 total,
 status: "reserved",
 createdAt: new Date().toISOString(),
 });
 localStorage.setItem("agropark_bookings", JSON.stringify(bookings));
 } catch {
 // ignore storage errors
 }
 setStep(3);
 }

 return (
 <PageShell>
 <section className="bg-gradient-to-br from-green-900 to-green-800 py-16 text-white">
 <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
 <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20">Online-Buchung</Badge>
 <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Tickets buchen</h1>
 <p className="mx-auto mt-4 max-w-xl text-white/80">
 Wählen Sie Ihren Besuchstermin und Ihre Tickets. Sie erhalten sofort eine
 Bestätigung mit QR-Code.
 </p>
 </div>
 </section>

 <section className="py-12">
 <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
 {/* Stepper */}
 <div className="mb-10 flex items-center justify-between">
 {[
 { num: 1, label: "Termin" },
 { num: 2, label: "Tickets" },
 { num: 3, label: "Bestätigung" },
 ].map((s) => (
 <div key={s.num} className="flex flex-1 flex-col items-center">
 <div
 className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
 step >= s.num ? "bg-green-900 text-white" : "bg-neutral-200 text-neutral-600"
 }`}
 >
 {step > s.num ? <Check className="size-5" /> : s.num}
 </div>
 <span className="mt-2 text-xs font-semibold text-neutral-600">{s.label}</span>
 {s.num < 3 && (
 <div
 className={`absolute h-0.5 w-[calc(33%-3rem)] translate-x-[calc(100%+1.5rem)] ${
 step > s.num ? "bg-green-900" : "bg-neutral-200"
 }`}
 />
 )}
 </div>
 ))}
 </div>

 {step === 1 && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="space-y-6"
 >
 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calendar className="size-5 text-green-700" />
 Besuchstermin wählen
 </CardTitle>
 <CardDescription>
 Buchbar in der Saison: {seasonWindow.label}
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-3">
 <Label htmlFor="visit-date">Besuchstermin</Label>
 <Input
 id="visit-date"
 name="visit-date"
 type="date"
 value={date}
 onChange={(e) => setDate(e.target.value)}
 min={seasonWindow.minDate}
 max={seasonWindow.maxDate}
 className="w-full"
 aria-invalid={!isDateInSeason}
 />
 {!isDateInSeason && (
 <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
 Bitte wählen Sie ein Datum innerhalb der Parksaison.
 </p>
 )}
 <Button
 onClick={() => date && isDateInSeason && setStep(2)}
 disabled={!date || !isDateInSeason}
 className="mt-6 w-full bg-green-900 hover:bg-green-800"
 >
 Weiter <ArrowRight className="ml-2 size-4" />
 </Button>
 </CardContent>
 </Card>
 </motion.div>
 )}

 {step === 2 && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="space-y-6"
 >
 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Ticket className="size-5 text-green-700" />
 Tickets auswählen
 </CardTitle>
 <CardDescription>Gewählter Termin: {date}</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {ticketTypes.map((ticket) => (
 <div
 key={ticket.id}
 className="flex items-center justify-between rounded-xl border border-neutral-200 p-4"
 >
 <div>
 <div className="font-bold text-foreground">{ticket.name}</div>
 <div className="text-sm text-neutral-600">{ticket.description}</div>
 <div className="mt-1 text-sm font-bold text-green-900">
 {ticket.price.toFixed(2).replace(".", ",")} €
 </div>
 </div>
 <div className="flex items-center gap-3">
 <button
 type="button"
 onClick={() => handleQty(ticket.id, -1)}
 disabled={(quantities[ticket.id] || 0) === 0}
 aria-label={`${ticket.name} reduzieren`}
 className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
 >
 <Minus className="size-4" />
 </button>
 <span className="w-6 text-center font-bold">{quantities[ticket.id] || 0}</span>
 <button
 type="button"
 onClick={() => handleQty(ticket.id, 1)}
 disabled={(quantities[ticket.id] || 0) >= MAX_TICKET_QUANTITY}
 aria-label={`${ticket.name} erhöhen`}
 className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
 >
 <Plus className="size-4" />
 </button>
 </div>
 </div>
 ))}

 <form onSubmit={handleSubmit} className="space-y-4 pt-4">
 <div className="grid gap-4 sm:grid-cols-2">
 <div className="space-y-2">
 <Label htmlFor="name">Name</Label>
 <Input
 id="name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Max Mustermann"
 required
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="email">E-Mail</Label>
 <Input
 id="email"
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="max@example.com"
 required
 />
 </div>
 </div>

 <div className="rounded-xl bg-neutral-100 p-4">
 <div className="flex items-center justify-between">
 <span className="font-bold">Gesamtsumme</span>
 <span className="text-2xl font-black text-green-900">
 {total.toFixed(2).replace(".", ",")} €
 </span>
 </div>
 <p className="mt-1 flex items-center gap-1 text-xs text-neutral-600">
 <CreditCard className="size-3" /> Zahlung erfolgt vor Ort am Besuchstag.
 </p>
 </div>

 <div className="flex gap-3">
 <Button
 type="button"
 variant="outline"
 onClick={() => setStep(1)}
 className="flex-1"
 >
 Zurück
 </Button>
 <Button
 type="submit"
 disabled={!hasTickets || !name.trim() || !email.trim()}
 className="flex-1 bg-green-900 hover:bg-green-800"
 >
 Jetzt reservieren
 </Button>
 </div>
 </form>
 </CardContent>
 </Card>
 </motion.div>
 )}

 {step === 3 && (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center"
 >
 <Card className="border-green-200 bg-green-50">
 <CardHeader>
 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900 text-white">
 <Check className="size-8" />
 </div>
 <CardTitle className="text-2xl text-green-900">Buchung bestätigt!</CardTitle>
 <CardDescription>
 Wir haben Ihre Reservierung für {date} erhalten.
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="mx-auto h-48 w-48 rounded-xl border-4 border-white bg-white p-2 shadow-sm">
 <SimpleQR value={bookingRef || "AP-DEMO"} />
 </div>
 <p className="font-mono text-sm font-bold text-green-900">{bookingRef}</p>
 <div className="rounded-xl bg-white p-4 text-left text-sm">
 <p><strong>Name:</strong> {name}</p>
 <p><strong>E-Mail:</strong> {email}</p>
 <p><strong>Datum:</strong> {date}</p>
 <p><strong>Gesamt:</strong> {total.toFixed(2).replace(".", ",")} €</p>
 <p><strong>Zahlung:</strong> Vor Ort am Besuchstag</p>
 </div>
 <div className="flex justify-center gap-3">
 <Button asChild variant="outline">
 <Link href="/">Zur Startseite</Link>
 </Button>
 <Button asChild className="bg-green-900 hover:bg-green-800">
 <Link href="/dashboard">Zum Dashboard</Link>
 </Button>
 </div>
 </CardContent>
 </Card>
 </motion.div>
 )}
 </div>
 </section>
 </PageShell>
 );
}
