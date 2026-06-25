"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, CalendarCheck, CheckCircle2, Gauge, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguagePreference, type LanguageCode } from "@/components/i18n/use-language-preference";

const heroCopy: Record<
  LanguageCode,
  {
    alt: string;
    badge: string;
    title: string;
    lead: string;
    actions: { label: string; href: string; icon: LucideIcon }[];
    kpis: { value: string; label: string; change: string }[];
    panelTitle: string;
    panelBadge: string;
    pathLabel: string;
    pathTitle: string;
    pathItems: string[];
    simulation: {
      photo: string;
      booking: string;
      ai: string;
      crm: string;
      rail: { title: string; text: string }[];
    };
  }
> = {
  ru: {
    alt: "Территория АгроПарка Некрасово поле",
    badge: "Сезон май-сентябрь | онлайн-бронирование",
    title: "Некрасово поле как понятная цифровая экосистема для гостей и команды.",
    lead:
      "Гость видит реальные зоны парка, цены и маршруты, быстро задает вопрос AI и отправляет заявку. Команда получает структурированную бронь, статусы и KPI в едином рабочем контуре.",
    actions: [
      { label: "Забронировать отдых", href: "/buchung", icon: CalendarCheck },
      { label: "Спросить AI", href: "/kontakt", icon: Bot },
      { label: "Вход для команды", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "броней сегодня", change: "+12% к прошлому дню" },
      { value: "8", label: "открытых заявок", change: "3 ждут ответа" },
      { value: "78%", label: "загрузка зон", change: "+5% в реальном времени" },
      { value: "6", label: "форматов отдыха", change: "экскурсии, купола, события" },
    ],
    panelTitle: "AgroPark OS",
    panelBadge: "connected beta",
    pathLabel: "Живой сценарий",
    pathTitle: "Сайт, AI и CRM работают как один маршрут",
    pathItems: ["Гость выбирает формат и дату", "AI объясняет цены, маршрут и правила", "Команда видит заявку и следующий шаг"],
    simulation: {
      photo: "реальный парк",
      booking: "Бронь",
      ai: "AI отвечает",
      crm: "CRM обновлена",
      rail: [
        { title: "Гриль-купола", text: "Цены, вместимость и правила собраны до заявки." },
        { title: "События", text: "Концерты, мастер-классы и корпоративные визиты получают отдельный путь." },
        { title: "Команда", text: "Роли видят только нужные действия и статусы." },
      ],
    },
  },
  en: {
    alt: "AgroPark Nekrasovo Pole territory",
    badge: "May-September season | online booking",
    title: "Nekrasovo Field as a clear digital ecosystem for guests and the team.",
    lead:
      "Guests see real park zones, prices and routes, ask AI quickly and send a request. The team receives structured bookings, statuses and KPIs in one operating surface.",
    actions: [
      { label: "Book a visit", href: "/buchung", icon: CalendarCheck },
      { label: "Ask AI", href: "/kontakt", icon: Bot },
      { label: "Team login", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "bookings today", change: "+12% vs. yesterday" },
      { value: "8", label: "open requests", change: "3 need a response" },
      { value: "78%", label: "zone occupancy", change: "+5% live" },
      { value: "6", label: "visit formats", change: "tours, domes, events" },
    ],
    panelTitle: "AgroPark OS",
    panelBadge: "connected beta",
    pathLabel: "Live scenario",
    pathTitle: "Website, AI and CRM move as one route",
    pathItems: ["Guest selects a format and date", "AI explains price, route and rules", "Team sees the request and next action"],
    simulation: {
      photo: "real park",
      booking: "Booking",
      ai: "AI answer",
      crm: "CRM updated",
      rail: [
        { title: "Grill domes", text: "Prices, capacity and rules are clear before the request." },
        { title: "Events", text: "Concerts, workshops and corporate visits get their own path." },
        { title: "Team", text: "Roles see only relevant actions and statuses." },
      ],
    },
  },
  de: {
    alt: "Gelände des AgroParks Nekrasovo Pole",
    badge: "Saison Mai-September | Online-Buchung",
    title: "Nekrasovo Feld als klare digitale Plattform für Gäste und Team.",
    lead:
      "Gäste sehen echte Parkzonen, Preise und Routen, fragen AI direkt und senden eine Anfrage. Das Team erhält strukturierte Buchungen, Status und KPI in einer Arbeitsoberfläche.",
    actions: [
      { label: "Besuch buchen", href: "/buchung", icon: CalendarCheck },
      { label: "AI fragen", href: "/kontakt", icon: Bot },
      { label: "Team-Login", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "Buchungen heute", change: "+12% zum Vortag" },
      { value: "8", label: "offene Anfragen", change: "3 brauchen Antwort" },
      { value: "78%", label: "Auslastung", change: "+5% live" },
      { value: "6", label: "Besuchsformate", change: "Touren, Kuppeln, Events" },
    ],
    panelTitle: "AgroPark OS",
    panelBadge: "connected beta",
    pathLabel: "Live-Szenario",
    pathTitle: "Website, AI und CRM laufen als ein Weg",
    pathItems: ["Gast wählt Format und Datum", "AI erklärt Preis, Route und Regeln", "Team sieht Anfrage und nächsten Schritt"],
    simulation: {
      photo: "echter Park",
      booking: "Buchung",
      ai: "AI-Antwort",
      crm: "CRM aktualisiert",
      rail: [
        { title: "Grillkuppeln", text: "Preise, Kapazität und Regeln sind vor der Anfrage klar." },
        { title: "Events", text: "Konzerte, Workshops und Firmenbesuche bekommen eigene Pfade." },
        { title: "Team", text: "Rollen sehen nur relevante Aktionen und Status." },
      ],
    },
  },
  tr: {
    alt: "AgroPark Nekrasovo Pole alanı",
    badge: "Mayıs-Eylül sezonu | online rezervasyon",
    title: "Nekrasovo Alanı misafir ve ekip için net bir dijital ekosistem.",
    lead:
      "Misafirler gerçek park alanlarını, fiyatları ve rotaları görür, AI'ya hızlıca sorar ve talep gönderir. Ekip yapılandırılmış rezervasyonları, durumları ve KPI'ları tek yüzeyde alır.",
    actions: [
      { label: "Rezervasyon yap", href: "/buchung", icon: CalendarCheck },
      { label: "AI'ya sor", href: "/kontakt", icon: Bot },
      { label: "Ekip girişi", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "bugünkü rezervasyon", change: "düne göre +12%" },
      { value: "8", label: "açık talep", change: "3 yanıt bekliyor" },
      { value: "78%", label: "alan doluluğu", change: "canlı +5%" },
      { value: "6", label: "ziyaret formatı", change: "turlar, kubbeler, etkinlikler" },
    ],
    panelTitle: "AgroPark OS",
    panelBadge: "connected beta",
    pathLabel: "Canlı senaryo",
    pathTitle: "Website, AI ve CRM tek rota gibi çalışır",
    pathItems: ["Misafir format ve tarih seçer", "AI fiyatı, rotayı ve kuralları açıklar", "Ekip talebi ve sonraki adımı görür"],
    simulation: {
      photo: "gerçek park",
      booking: "Rezervasyon",
      ai: "AI yanıtı",
      crm: "CRM güncellendi",
      rail: [
        { title: "Grill kubbeleri", text: "Fiyat, kapasite ve kurallar talep öncesi nettir." },
        { title: "Etkinlikler", text: "Konser, atölye ve kurumsal ziyaretler ayrı yol alır." },
        { title: "Ekip", text: "Roller sadece ilgili aksiyon ve durumları görür." },
      ],
    },
  },
};

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function FloatingCanvas({ labels }: { labels: (typeof heroCopy)["en"]["simulation"] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const photo = new window.Image();
    photo.src = "/client-assets/agropark/grill-dome.jpg";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const p = progressRef.current;
      ctx.clearRect(0, 0, width, height);

      const mist = ctx.createLinearGradient(0, 0, width, height);
      mist.addColorStop(0, "rgba(255,255,255,.58)");
      mist.addColorStop(0.46, "rgba(220,252,231,.2)");
      mist.addColorStop(1, "rgba(20,83,45,.12)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = 0.76;
      ctx.fillStyle = "rgba(255,255,255,.62)";
      for (let i = 0; i < 9; i++) {
        const x = ((i * 210 + frame * 0.22) % (width + 240)) - 120;
        const y = height * (0.18 + (i % 4) * 0.13) + Math.sin(frame / 48 + i) * 12;
        ctx.beginPath();
        ctx.ellipse(x, y, 120 + (i % 3) * 32, 28 + (i % 2) * 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      const cardW = Math.min(440, width * 0.58);
      const cardH = cardW * 0.68;
      const cx = width * (0.48 + p * 0.08);
      const cy = height * (0.48 - p * 0.08);
      const tilt = (-0.08 + p * 0.16) * Math.PI;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.shadowColor = "rgba(15,53,37,.24)";
      ctx.shadowBlur = 38;
      ctx.shadowOffsetY = 24;
      drawRoundRect(ctx, -cardW / 2, -cardH / 2, cardW, cardH, 24);
      ctx.fillStyle = "#fbfaf5";
      ctx.fill();

      drawRoundRect(ctx, -cardW / 2 + 16, -cardH / 2 + 16, cardW - 32, cardH * 0.56, 18);
      ctx.save();
      ctx.clip();
      if (photo.complete) {
        ctx.drawImage(photo, -cardW / 2 + 16, -cardH / 2 + 16, cardW - 32, cardH * 0.56);
      } else {
        ctx.fillStyle = "#174832";
        ctx.fillRect(-cardW / 2 + 16, -cardH / 2 + 16, cardW - 32, cardH * 0.56);
      }
      ctx.restore();

      ctx.fillStyle = "rgba(15,53,37,.9)";
      ctx.font = "800 18px Avenir Next, Segoe UI, sans-serif";
      ctx.fillText(labels.photo, -cardW / 2 + 28, cardH * 0.19);

      const chipY = cardH * 0.29;
      [labels.booking, labels.ai, labels.crm].forEach((label, index) => {
        const chipX = -cardW / 2 + 18 + index * ((cardW - 36) / 3);
        const chipW = (cardW - 54) / 3;
        drawRoundRect(ctx, chipX, chipY, chipW, 42, 14);
        ctx.fillStyle = index === 1 ? "#facc15" : index === 2 ? "#14532d" : "#ecfdf5";
        ctx.fill();
        ctx.fillStyle = index === 1 ? "#0f3525" : index === 2 ? "#ffffff" : "#14532d";
        ctx.font = "800 12px Avenir Next, Segoe UI, sans-serif";
        ctx.fillText(label, chipX + 14, chipY + 26);
      });
      ctx.restore();

      frame += 1;
    };

    resize();
    photo.onload = draw;
    window.addEventListener("resize", resize);

    let raf = 0;
    const tick = () => {
      draw();
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, [labels]);

  useGSAP(
    () => {
      if (!canvasRef.current || typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);
      const trigger = canvasRef.current.closest("section");
      if (!trigger) return;

      const scroll = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      return () => scroll.kill();
    },
    { dependencies: [] },
  );

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full opacity-70" aria-hidden="true" />;
}

export function Hero() {
  const { language } = useLanguagePreference();
  const copy = heroCopy[language];
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current || typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".hero-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
      });

      gsap.to(".hero-float", {
        y: -22,
        rotateX: 4,
        rotateY: -5,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#f7f5ec] pt-32 text-emerald-950 md:pt-24"
    >
      <NextImage src="/client-assets/agropark/aerial-view.png" alt={copy.alt} fill priority className="-z-20 object-cover opacity-18" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,.88),transparent_32%),radial-gradient(circle_at_78%_0%,rgba(252,211,77,.24),transparent_28%),linear-gradient(135deg,#f9f7ef_0%,#edf6e8_42%,#cfe6d7_100%)]" />
      <div className="absolute inset-x-0 top-0 z-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,.8),rgba(255,255,255,0))]" />
      <FloatingCanvas labels={copy.simulation} />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-96px)] max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_0.9fr] lg:items-center lg:px-8 xl:gap-16">
        <div className="max-w-4xl">
          <Badge className="hero-reveal mb-6 border border-emerald-900/10 bg-white/72 px-4 py-2 text-emerald-900 shadow-sm backdrop-blur hover:bg-white/72">
            {copy.badge}
          </Badge>
          <h1 className="hero-reveal text-4xl font-black leading-[0.98] tracking-tight text-emerald-950 sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>
          <p className="hero-reveal mt-6 max-w-2xl text-base leading-8 text-emerald-950/72 sm:text-lg">{copy.lead}</p>
          <div className="hero-reveal mt-8 flex flex-wrap gap-3">
            {copy.actions.map((action, index) => (
              <Button
                key={action.href}
                asChild
                size="lg"
                className={
                  index === 0
                    ? "w-full bg-amber-300 text-emerald-950 hover:bg-amber-200 sm:w-auto"
                    : "w-full border border-emerald-900/12 bg-white/72 text-emerald-950 shadow-sm hover:bg-white sm:w-auto"
                }
              >
                <Link href={action.href}>
                  <action.icon className="size-5" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
          <div className="hero-reveal mt-10 grid max-w-3xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {copy.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-emerald-900/10 bg-white/70 p-4 shadow-sm backdrop-blur">
                <div className="text-2xl font-black text-emerald-950">{kpi.value}</div>
                <div className="mt-1 text-[11px] font-black uppercase leading-4 text-emerald-950/60">{kpi.label}</div>
                <div className="mt-2 text-xs font-bold text-emerald-700">{kpi.change}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-reveal hero-float relative mx-auto w-full max-w-[560px]" style={{ perspective: "1200px" }}>
          <div className="rounded-[28px] border border-emerald-950/12 bg-[#fbfaf5]/92 p-4 text-emerald-950 shadow-2xl shadow-emerald-950/18 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-emerald-950/10 pb-4">
              <strong className="text-sm">{copy.panelTitle}</strong>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900">{copy.panelBadge}</span>
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              {copy.kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm">
                  <div className="text-xs font-black uppercase text-emerald-950/54">{kpi.label}</div>
                  <div className="mt-3 text-3xl font-black">{kpi.value}</div>
                  <div className="mt-2 text-xs font-bold text-emerald-700">{kpi.change}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-emerald-950/10 bg-emerald-950 p-5 text-white">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-amber-200">{copy.pathLabel}</p>
                  <h2 className="mt-1 text-xl font-black">{copy.pathTitle}</h2>
                </div>
                <Sparkles className="size-5 shrink-0 text-amber-200" />
              </div>
              <div className="space-y-3">
                {copy.pathItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 p-3 text-sm font-bold">
                    <CheckCircle2 className="size-4 shrink-0 text-lime-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {copy.simulation.rail.map((item) => (
                <div key={item.title} className="rounded-lg border border-emerald-950/10 bg-white p-3">
                  <div className="text-xs font-black uppercase text-amber-700">{item.title}</div>
                  <div className="mt-2 text-xs leading-5 text-emerald-950/62">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
