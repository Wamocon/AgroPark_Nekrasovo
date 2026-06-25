"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check, CreditCard, Minus, Plus, Ticket } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { consentCopy } from "@/components/i18n/consent-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_TICKET_QUANTITY = 20;

const ticketConfig = [
  { id: "grill-weekday-morning", price: 2300 },
  { id: "grill-weekday-evening", price: 4600 },
  { id: "grill-full-day", price: 6300 },
  { id: "big-dome-weekend", price: 9200 },
];

function formatRubles(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

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
  return { minDate: formatDateInput(min), maxDate: formatDateInput(seasonEnd), seasonYear };
}

function generateBookingRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "AP-";
  for (let i = 0; i < 8; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
  return ref;
}

function SimpleQR({ label, value }: { label: string; value: string }) {
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
      for (let c = 0; c < cells; c++) row.push(rng(r * cells + c) > 0.56);
      rows.push(row);
    }
    const markCorner = (sr: number, sc: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          rows[sr + r][sc + c] = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
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
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full rounded-lg" aria-label={label}>
      <rect width={size} height={size} fill="white" />
      {grid.map((row, r) =>
        row.map((filled, c) => (filled ? <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="#14532d" /> : null)),
      )}
    </svg>
  );
}

export default function BookingPage() {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].booking;
  const consentText = consentCopy[language];
  const seasonWindow = useMemo(() => getSeasonWindow(), []);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [consent, setConsent] = useState(false);
  const total = ticketConfig.reduce((sum, t) => sum + (quantities[t.id] || 0) * t.price, 0);
  const hasTickets = total > 0;
  const isDateInSeason = !date || (date >= seasonWindow.minDate && date <= seasonWindow.maxDate);

  function handleQty(id: string, delta: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.min(MAX_TICKET_QUANTITY, Math.max(0, (prev[id] || 0) + delta)) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !isDateInSeason || !hasTickets || !name.trim() || !email.trim() || !consent) return;
    const ref = generateBookingRef();
    const normalizedEmail = email.trim().toLowerCase();
    setBookingRef(ref);
    try {
      const bookings = JSON.parse(localStorage.getItem("agropark_bookings") || "[]");
      bookings.push({ id: ref, date, name: name.trim(), email: normalizedEmail, quantities, total, currency: "RUB", status: "reserved", createdAt: new Date().toISOString() });
      localStorage.setItem("agropark_bookings", JSON.stringify(bookings));
    } catch {}
    setName(name.trim());
    setEmail(normalizedEmail);
    setStep(3);
  }

  return (
    <PageShell>
      <section className="bg-gradient-to-br from-emerald-950 to-emerald-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20">{copy.badge}</Badge>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{copy.lead}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid grid-cols-3 gap-2 text-center sm:gap-3">
            {copy.steps.map((label, index) => (
              <div
                key={label}
                className={`min-h-12 break-words rounded-lg border p-2 text-xs font-bold sm:p-3 sm:text-sm ${
                  step >= index + 1 ? "border-emerald-900 bg-emerald-50 text-emerald-950" : "border-neutral-200 bg-white text-neutral-500"
                }`}
              >
                {index + 1}. {label}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="size-5 text-emerald-700" />
                    {copy.dateTitle}
                  </CardTitle>
                  <CardDescription>
                    {copy.seasonPrefix} {copy.seasonRange(seasonWindow.seasonYear)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Label htmlFor="visit-date">{copy.dateLabel}</Label>
                  <Input id="visit-date" name="visit-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={seasonWindow.minDate} max={seasonWindow.maxDate} aria-invalid={!isDateInSeason} />
                  {!isDateInSeason ? <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{copy.dateError}</p> : null}
                  <Button onClick={() => date && isDateInSeason && setStep(2)} disabled={!date || !isDateInSeason} className="mt-6 w-full bg-emerald-900 hover:bg-emerald-800">
                    {copy.next}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="size-5 text-emerald-700" />
                    {copy.formatTitle}
                  </CardTitle>
                  <CardDescription>
                    {copy.datePrefix} {date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ticketConfig.map((ticket, index) => {
                    const ticketCopy = copy.tickets[index];

                    return (
                      <div key={ticket.id} className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200 p-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="font-bold text-foreground">{ticketCopy.name}</div>
                          <div className="text-sm text-neutral-600">{ticketCopy.description}</div>
                          <div className="mt-1 text-sm font-bold text-emerald-900">{formatRubles(ticket.price)}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleQty(ticket.id, -1)}
                            disabled={(quantities[ticket.id] || 0) === 0}
                            aria-label={`${ticketCopy.name} ${copy.decrease}`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-6 text-center font-bold">{quantities[ticket.id] || 0}</span>
                          <button
                            type="button"
                            onClick={() => handleQty(ticket.id, 1)}
                            disabled={(quantities[ticket.id] || 0) >= MAX_TICKET_QUANTITY}
                            aria-label={`${ticketCopy.name} ${copy.increase}`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{copy.nameLabel}</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={copy.namePlaceholder} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ivan@example.com" required />
                      </div>
                    </div>
                    <div className="rounded-xl bg-neutral-100 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{copy.total}</span>
                        <span className="text-2xl font-black text-emerald-900">{formatRubles(total)}</span>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-xs text-neutral-600">
                        <CreditCard className="size-3" />
                        {copy.paymentNote}
                      </p>
                    </div>
                    <label htmlFor="pdn-consent" className="flex items-start gap-2 text-xs leading-5 text-neutral-600">
                      <input
                        id="pdn-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        aria-describedby="pdn-consent-error"
                        className="mt-0.5 size-5 shrink-0 accent-emerald-800"
                      />
                      <span>
                        {consentText.before}
                        <Link href="/datenschutz#pdn" target="_blank" className="font-bold text-emerald-900 underline">
                          {consentText.link}
                        </Link>
                        {consentText.after}
                      </span>
                    </label>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        {copy.back}
                      </Button>
                      <Button type="submit" disabled={!hasTickets || !name.trim() || !email.trim() || !consent} className="flex-1 bg-emerald-900 hover:bg-emerald-800">
                        {copy.book}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <Card className="border-emerald-200 bg-emerald-50">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-900 text-white">
                    <Check className="size-8" />
                  </div>
                  <CardTitle className="text-2xl text-emerald-900">{copy.confirmedTitle}</CardTitle>
                  <CardDescription>{copy.confirmedLead(date)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mx-auto h-48 w-48 rounded-xl border-4 border-white bg-white p-2 shadow-sm">
                    <SimpleQR label={copy.qrLabel(bookingRef || "AP-DEMO")} value={bookingRef || "AP-DEMO"} />
                  </div>
                  <p className="font-mono text-sm font-bold text-emerald-900">{bookingRef}</p>
                  <div className="rounded-xl bg-white p-4 text-left text-sm">
                    <p>
                      <strong>{copy.summaryLabels.name}:</strong> {name}
                    </p>
                    <p>
                      <strong>E-mail:</strong> {email}
                    </p>
                    <p>
                      <strong>{copy.summaryLabels.date}:</strong> {date}
                    </p>
                    <p>
                      <strong>{copy.summaryLabels.total}:</strong> {formatRubles(total)}
                    </p>
                    <p>
                      <strong>{copy.summaryLabels.payment}:</strong> {copy.paymentSummary}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild variant="outline">
                      <Link href="/">{copy.home}</Link>
                    </Button>
                    <Button asChild className="bg-emerald-900 hover:bg-emerald-800">
                      <Link href="/dashboard">{copy.dashboard}</Link>
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
