import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are AgroPark AI Assist, a guarded multilingual assistant for AgroPark Nekrasovo Pole.
Reply in Russian, German, Turkish or English based on the user's language.
Known current beta capabilities: premium public website, booking request flow with demo QR confirmation, AI chat fallback, CRM dashboard, role-based demo login, activity feed, operational KPIs and RU/EN/DE/TR language switching.
Known future roadmap: production database, real payment provider after approval, staff notifications, verified knowledge base with sources, SEO/GEO content pages, loyalty, shop, IoT occupancy and VR tour modules.
Never request passwords, payment cards, passport scans, ID photos, private keys or sensitive personal data. Demo bookings do not take real payment.`;

type Message = { role: "user" | "assistant" | "system"; content: string };
type Lang = "ru" | "en" | "de" | "tr";

function lastUser(messages: Message[]) {
  return messages.filter((message) => message.role === "user").at(-1)?.content || "";
}

function detectLanguage(text: string): Lang {
  const lower = text.toLowerCase();
  if (/[а-яё]/i.test(text)) return "ru";
  if (/[ıİğĞşŞçÇ]/.test(text) || /(merhaba|fiyat|rezervasyon|nerede|türkçe|turkce|nasıl|nasil|kaç|kac|saat|gelecek|özellik|ozellik|çalış|calis)/i.test(lower)) return "tr";
  if (/[äöüß]/i.test(text) || /(hallo|preis|preise|öffnung|oeffnung|buchung|anfahrt|deutsch|zukunft|rollen|funktionen)/i.test(lower)) return "de";
  return "en";
}

function intent(input: string) {
  const lower = input.toLowerCase();

  return {
    price: /(цена|стоим|руб|₽|price|cost|preis|kosten|fiyat|ücret|куп|гриль|dome|kubbe|kuppel)/i.test(lower),
    hours: /(режим работы|часы|график|открыт|закрыт|open|hours|opening|öffnung|oeffnung|saat kaçta|kaçta aç|ne zaman açık)/i.test(lower),
    login: /(login|вход|парол|demo|демо|crm|dashboard|панел|giriş|zugang)/i.test(lower),
    contact: /(contact|контакт|телефон|phone|whatsapp|telegram|адрес|route|маршрут|where|nerede|anfahrt|iletişim)/i.test(lower),
    booking: /(брон|заяв|book|booking|reservation|reserve|buchung|rezervasyon|qr)/i.test(lower),
    roles: /(роль|роли|admin|админ|директор|менеджер|сотруд|staff|manager|role|roles|rollen|rol)/i.test(lower),
    features: /(что работает|сейчас|функц|возможн|feature|features|capabilit|works|funktionen|özellik|ozellik|neler var|çalışıyor|calisiyor|current)/i.test(lower),
    future: /(future|roadmap|next|потом|будущ|дальше|zukunft|roadmap|gelecek|sonra|добав)/i.test(lower),
    language: /(язык|языки|русск|англ|немец|турец|language|languages|sprach|deutsch|english|türkçe|turkish|german)/i.test(lower),
    safety: /(payment|оплат|карта|secure|безопас|gdpr|данн|privacy|sicher|zahlung|ödeme|güven)/i.test(lower),
  };
}

function fallbackReply(input: string) {
  const lang = detectLanguage(input);
  const ask = intent(input);

  const replies: Record<Lang, Record<string, string>> = {
    ru: {
      price:
        "Гриль-купола начинаются от 2 300 ₽ в будни. Стандартный купол: 2 300 ₽ / 4 600 ₽ / 6 300 ₽; выходные: 3 450 ₽ / 6 300 ₽ / 8 000 ₽. Большой купол: до 13 200 ₽ за полный выходной день.",
      hours: "Сезон АгроПарка: май-сентябрь. Режим работы: вторник-воскресенье 10:00-19:00, понедельник закрыто.",
      login:
        "Демо-входы: директор admin@agropark.demo, менеджер manager@agropark.demo, сотрудник staff@agropark.demo и гость visitor@agropark.demo. Пароль для демо: password.",
      contact:
        "Контакты: +7 (911) 474-30-04, info@agroparknp.ru, Telegram @adm_agropark39. Адрес: поселок Некрасово, Гурьевский муниципальный округ.",
      booking:
        "Сейчас бронь работает как безопасная демо-заявка: гость выбирает формат, дату и контакты, получает QR-подтверждение, а команда видит заявку в CRM. Реальная оплата не списывается.",
      roles:
        "В демо предусмотрены 4 роли: директор видит KPI и контроль сезона, менеджер обрабатывает заявки, сотрудник работает с операционными задачами, гость проверяет путь бронирования и ответы AI.",
      features:
        "Сейчас работает публичный сайт, бронирование, AI-чат, демо-QR, CRM-панель, роли, лента активности, KPI и переключение RU/EN/DE/TR. Это уже можно показывать как цельный beta-продукт.",
      future:
        "Следующий слой: production-база, уведомления персоналу, реальные платежи после согласования, база знаний AI с источниками, SEO/GEO-страницы, loyalty, shop, IoT-загрузка зон и VR-тур.",
      language:
        "Интерфейс поддерживает переключение RU / EN / DE / TR. AI также отвечает на русском, английском, немецком и турецком, чтобы гостевой путь был понятен разным аудиториям.",
      safety:
        "В демо нет реальных списаний и не нужны чувствительные данные. Для production добавляются правила доступа, журналирование, согласованная политика данных и платежный провайдер.",
      default:
        "AgroPark OS показывает полноценный путь: современная главная, бронь, AI-помощник, CRM-роли и KPI. Спросите про цены, бронь, роли, языки или будущий roadmap.",
    },
    en: {
      price:
        "Grill domes start at 2,300 RUB on weekdays. Standard dome: 2,300 / 4,600 / 6,300 RUB; weekends: 3,450 / 6,300 / 8,000 RUB. The big dome reaches 13,200 RUB for a full weekend day.",
      hours: "The park season is May to September. Opening hours: Tuesday-Sunday 10:00-19:00, Monday closed.",
      login:
        "Demo roles: director admin@agropark.demo, manager manager@agropark.demo, staff staff@agropark.demo and visitor visitor@agropark.demo. Demo password: password.",
      contact: "Contact: +7 (911) 474-30-04, info@agroparknp.ru, Telegram @adm_agropark39.",
      booking:
        "Booking currently works as a safe demo request: the guest selects a format, date and contact details, receives QR confirmation and the team sees the request in CRM. No real payment is charged.",
      roles:
        "The demo has 4 roles: director for KPIs and season control, manager for requests, staff for operational tasks and visitor for testing booking and AI answers.",
      features:
        "Working now: premium public site, booking flow, AI chat, demo QR, CRM dashboard, roles, activity feed, KPIs and RU/EN/DE/TR language switching. It is ready to demo as one connected beta product.",
      future:
        "Next roadmap layer: production database, staff notifications, real payments after approval, AI knowledge base with sources, SEO/GEO pages, loyalty, shop, IoT zone occupancy and VR tour.",
      language:
        "The interface switches between RU / EN / DE / TR. The AI also answers in Russian, English, German and Turkish so the guest journey can serve different visitor groups.",
      safety:
        "The demo does not charge real payments and does not need sensitive data. Production adds role access, logs, agreed data policy and a payment provider.",
      default:
        "AgroPark OS demonstrates the complete journey: modern homepage, booking, AI assistant, CRM roles and KPI dashboard. Ask about prices, booking, roles, languages or the future roadmap.",
    },
    de: {
      price:
        "Die Grillkuppeln starten werktags bei 2 300 ₽. Standardkuppel: 2 300 ₽ / 4 600 ₽ / 6 300 ₽; Wochenende: 3 450 ₽ / 6 300 ₽ / 8 000 ₽. Die große Kuppel erreicht bis 13 200 ₽ am Wochenende.",
      hours: "Saison Mai bis September: Dienstag bis Sonntag 10:00-19:00, Montag geschlossen.",
      login:
        "Demo-Zugänge: Direktor admin@agropark.demo, Manager manager@agropark.demo, Mitarbeiter staff@agropark.demo und Gast visitor@agropark.demo. Demo-Passwort: password.",
      contact: "Kontakt: +7 (911) 474-30-04, info@agroparknp.ru, Telegram @adm_agropark39.",
      booking:
        "Die Buchung läuft aktuell als sichere Demo-Anfrage: Format, Datum und Kontakt werden erfasst, QR-Bestätigung wird angezeigt und das Team sieht die Anfrage im CRM. Es wird keine echte Zahlung ausgelöst.",
      roles:
        "Die Demo hat 4 Rollen: Direktor für KPI und Saisonsteuerung, Manager für Anfragen, Mitarbeiter für operative Aufgaben und Gast für Buchung und AI-Antworten.",
      features:
        "Aktuell funktionieren: Premium-Website, Buchungsflow, AI-Chat, Demo-QR, CRM-Dashboard, Rollen, Activity Feed, KPI und Sprachwechsel RU/EN/DE/TR. Das ist als verbundene Beta präsentierbar.",
      future:
        "Nächste Ausbaustufe: Produktionsdatenbank, Team-Benachrichtigungen, echte Zahlungen nach Freigabe, AI-Wissensbasis mit Quellen, SEO/GEO-Seiten, Loyalty, Shop, IoT-Auslastung und VR-Tour.",
      language:
        "Die Oberfläche wechselt zwischen RU / EN / DE / TR. Die AI antwortet ebenfalls auf Russisch, Englisch, Deutsch und Türkisch.",
      safety:
        "In der Demo gibt es keine echten Zahlungen und keine sensiblen Daten. Für Production folgen Rollenrechte, Logging, abgestimmte Datenpolitik und Zahlungsanbieter.",
      default:
        "AgroPark OS zeigt den kompletten Weg: moderne Startseite, Buchung, AI-Assistent, CRM-Rollen und KPI-Dashboard. Fragen Sie nach Preisen, Buchung, Rollen, Sprachen oder Roadmap.",
    },
    tr: {
      price:
        "Grill kubbeleri hafta içi 2 300 ₽'den başlar. Standart kubbe: 2 300 ₽ / 4 600 ₽ / 6 300 ₽; hafta sonu 3 450 ₽ / 6 300 ₽ / 8 000 ₽. Büyük kubbe hafta sonu 13 200 ₽'ye kadar çıkar.",
      hours: "AgroPark sezonu Mayıs-Eylül. Saatler: salı-pazar 10:00-19:00, pazartesi kapalı.",
      login:
        "Demo girişleri: direktör admin@agropark.demo, yönetici manager@agropark.demo, personel staff@agropark.demo ve ziyaretçi visitor@agropark.demo. Demo şifresi: password.",
      contact: "İletişim: +7 (911) 474-30-04, info@agroparknp.ru, Telegram @adm_agropark39.",
      booking:
        "Rezervasyon şu anda güvenli demo talebi olarak çalışır: misafir formatı, tarihi ve iletişimi seçer, QR onayı alır ve ekip talebi CRM'de görür. Gerçek ödeme alınmaz.",
      roles:
        "Demoda 4 rol var: direktör KPI ve sezon kontrolünü görür, yönetici talepleri işler, personel operasyon görevlerini takip eder, ziyaretçi rezervasyon ve AI yanıtlarını test eder.",
      features:
        "Şu anda çalışanlar: premium web sitesi, rezervasyon akışı, AI sohbet, demo QR, CRM paneli, roller, aktivite akışı, KPI ve RU/EN/DE/TR dil değişimi. Tek bağlı beta ürün olarak sunulabilir.",
      future:
        "Sonraki katman: canlı veritabanı, ekip bildirimleri, onay sonrası gerçek ödeme, kaynaklı AI bilgi tabanı, SEO/GEO sayfaları, sadakat modülü, mağaza, IoT doluluk ve VR tur.",
      language:
        "Arayüz RU / EN / DE / TR arasında değişir. AI da Rusça, İngilizce, Almanca ve Türkçe yanıt verir.",
      safety:
        "Demoda gerçek ödeme yoktur ve hassas veri gerekmez. Production için rol erişimi, kayıtlar, veri politikası ve ödeme sağlayıcısı eklenir.",
      default:
        "AgroPark OS modern ana sayfa, rezervasyon, AI asistan, CRM rolleri ve KPI dashboard ile tam yolculuğu gösterir. Fiyat, rezervasyon, roller, diller veya roadmap hakkında sorabilirsiniz.",
    },
  };

  const dictionary = replies[lang];

  if (ask.roles && ask.features) return `${dictionary.roles} ${dictionary.features}`;
  if (ask.features && ask.future) return `${dictionary.features} ${dictionary.future}`;
  if (ask.roles && ask.language) return `${dictionary.roles} ${dictionary.language}`;
  if (ask.roles) return dictionary.roles;
  if (ask.features) return dictionary.features;
  if (ask.future) return dictionary.future;
  if (ask.language) return dictionary.language;
  if (ask.price) return dictionary.price;
  if (ask.hours) return dictionary.hours;
  if (ask.login) return dictionary.login;
  if (ask.contact) return dictionary.contact;
  if (ask.booking) return dictionary.booking;
  if (ask.safety) return dictionary.safety;
  return dictionary.default;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const messages = Array.isArray(body.messages) ? (body.messages as Message[]) : [];
  const input = lastUser(messages);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) return NextResponse.json({ reply: fallbackReply(input) });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.28,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-8).map((message) => ({ role: message.role, content: message.content }))],
      }),
    });

    if (!response.ok) return NextResponse.json({ reply: fallbackReply(input) });

    const data = await response.json();
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content || fallbackReply(input) });
  } catch {
    return NextResponse.json({ reply: fallbackReply(input) });
  }
}
