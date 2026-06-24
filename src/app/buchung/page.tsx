"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check, CreditCard, Minus, Plus, Ticket } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_TICKET_QUANTITY = 20;

const ticketTypes = [
  { id: "grill-weekday-morning", name: "Стандартный купол, утро", price: 2300, description: "Будни 10:00-14:00, до 12 человек" },
  { id: "grill-weekday-evening", name: "Стандартный купол, вечер", price: 4600, description: "Будни 15:00-21:00, до 12 человек" },
  { id: "grill-full-day", name: "Стандартный купол, весь день", price: 6300, description: "Будни 10:00-21:00, до 12 человек" },
  { id: "big-dome-weekend", name: "Большой купол, выходной", price: 9200, description: "Выходные 15:00-21:00, до 25 человек" },
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
  return { minDate: formatDateInput(min), maxDate: formatDateInput(seasonEnd), label: `1 мая - 30 сентября ${seasonYear}` };
}

function generateBookingRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "AP-";
  for (let i = 0; i < 8; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
  return ref;
}

function SimpleQR({ value }: { value: string }) {
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
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) rows[sr + r][sc + c] = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
    };
    markCorner(0, 0); markCorner(0, cells - 7); markCorner(cells - 7, 0);
    return rows;
  }, [value]);
  const size = 192;
  const cellSize = size / cells;
  return <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full rounded-lg" aria-label={`QR-код брони ${value}`}><rect width={size} height={size} fill="white" />{grid.map((row, r) => row.map((filled, c) => filled ? <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="#14532d" /> : null))}</svg>;
}

export default function BookingPage() {
  const seasonWindow = useMemo(() => getSeasonWindow(), []);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const total = ticketTypes.reduce((sum, t) => sum + (quantities[t.id] || 0) * t.price, 0);
  const hasTickets = total > 0;
  const isDateInSeason = !date || (date >= seasonWindow.minDate && date <= seasonWindow.maxDate);

  function handleQty(id: string, delta: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.min(MAX_TICKET_QUANTITY, Math.max(0, (prev[id] || 0) + delta)) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !isDateInSeason || !hasTickets || !name.trim() || !email.trim()) return;
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
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20">Онлайн-бронь</Badge>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Забронировать отдых</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">Выберите дату и формат посещения. Сейчас создается подтверждение с QR-кодом; оплата и финальное согласование проходят отдельно с командой парка.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid grid-cols-3 gap-2 text-center sm:gap-3">
            {["Дата", "Формат", "Подтверждение"].map((label, index) => (
              <div key={label} className={`min-h-12 break-words rounded-lg border p-2 text-xs font-bold sm:p-3 sm:text-sm ${step >= index + 1 ? "border-emerald-900 bg-emerald-50 text-emerald-950" : "border-neutral-200 bg-white text-neutral-500"}`}>{index + 1}. {label}</div>
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="size-5 text-emerald-700" />Выберите дату</CardTitle><CardDescription>Сезон бронирования: {seasonWindow.label}</CardDescription></CardHeader>
                <CardContent className="space-y-3">
                  <Label htmlFor="visit-date">Дата посещения</Label>
                  <Input id="visit-date" name="visit-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={seasonWindow.minDate} max={seasonWindow.maxDate} aria-invalid={!isDateInSeason} />
                  {!isDateInSeason ? <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Выберите дату в пределах сезона АгроПарка.</p> : null}
                  <Button onClick={() => date && isDateInSeason && setStep(2)} disabled={!date || !isDateInSeason} className="mt-6 w-full bg-emerald-900 hover:bg-emerald-800">Далее <ArrowRight className="ml-2 size-4" /></Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Ticket className="size-5 text-emerald-700" />Выберите формат</CardTitle><CardDescription>Дата: {date}</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  {ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-4">
                      <div><div className="font-bold text-foreground">{ticket.name}</div><div className="text-sm text-neutral-600">{ticket.description}</div><div className="mt-1 text-sm font-bold text-emerald-900">{formatRubles(ticket.price)}</div></div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => handleQty(ticket.id, -1)} disabled={(quantities[ticket.id] || 0) === 0} aria-label={`${ticket.name} уменьшить`} className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"><Minus className="size-4" /></button>
                        <span className="w-6 text-center font-bold">{quantities[ticket.id] || 0}</span>
                        <button type="button" onClick={() => handleQty(ticket.id, 1)} disabled={(quantities[ticket.id] || 0) >= MAX_TICKET_QUANTITY} aria-label={`${ticket.name} увеличить`} className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"><Plus className="size-4" /></button>
                      </div>
                    </div>
                  ))}

                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2"><Label htmlFor="name">Имя</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Петров" required /></div>
                      <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ivan@example.com" required /></div>
                    </div>
                    <div className="rounded-xl bg-neutral-100 p-4"><div className="flex items-center justify-between"><span className="font-bold">Итого</span><span className="text-2xl font-black text-emerald-900">{formatRubles(total)}</span></div><p className="mt-1 flex items-center gap-1 text-xs text-neutral-600"><CreditCard className="size-3" /> Онлайн-оплата пока не списывается; команда подтверждает детали отдельно.</p></div>
                    <div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Назад</Button><Button type="submit" disabled={!hasTickets || !name.trim() || !email.trim()} className="flex-1 bg-emerald-900 hover:bg-emerald-800">Забронировать</Button></div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <Card className="border-emerald-200 bg-emerald-50">
                <CardHeader><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-900 text-white"><Check className="size-8" /></div><CardTitle className="text-2xl text-emerald-900">Бронь подтверждена</CardTitle><CardDescription>Мы получили вашу заявку на {date}. Команда сможет уточнить детали перед визитом.</CardDescription></CardHeader>
                <CardContent className="space-y-6"><div className="mx-auto h-48 w-48 rounded-xl border-4 border-white bg-white p-2 shadow-sm"><SimpleQR value={bookingRef || "AP-DEMO"} /></div><p className="font-mono text-sm font-bold text-emerald-900">{bookingRef}</p><div className="rounded-xl bg-white p-4 text-left text-sm"><p><strong>Имя:</strong> {name}</p><p><strong>E-mail:</strong> {email}</p><p><strong>Дата:</strong> {date}</p><p><strong>Итого:</strong> {formatRubles(total)}</p><p><strong>Оплата:</strong> финальное согласование с командой парка</p></div><div className="flex flex-wrap justify-center gap-3"><Button asChild variant="outline"><Link href="/">На главную</Link></Button><Button asChild className="bg-emerald-900 hover:bg-emerald-800"><Link href="/dashboard">В панель</Link></Button></div></CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

