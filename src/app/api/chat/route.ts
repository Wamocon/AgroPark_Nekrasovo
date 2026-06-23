import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const FALLBACK_ENABLED = true;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2_000;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ChatMessage>;
  const validRole =
    candidate.role === "system" ||
    candidate.role === "user" ||
    candidate.role === "assistant";
  return validRole && typeof candidate.content === "string" && candidate.content.trim().length > 0;
}

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter(isChatMessage)
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));
}

const SYSTEM_PROMPT = `You are the AI visitor assistant for Некрасово поле, AgroPark Nekrasovo, a park complex in the Kaliningrad region.

Task: Answer visitor questions in Russian, German or Turkish. Help guests understand visits, events, grill house rentals, opening hours, contact options and booking.

Important information:
- Address: п. Некрасово, Гурьевский район, Калининградская область
- Opening hours: Tuesday to Sunday, 10:00-19:00, Monday closed
- Main offer: nature visits, family activities, events, corporate gatherings, photo locations and grill houses
- Contact: info@agroparknp.ru, +7 (911) 474-30-04
- Booking: visitors can reserve through /buchung
- Languages: Russian, German, Turkish

Behavior:
- Reply in the same language as the user when possible.
- Be friendly, concise and practical.
- If a booking cannot be completed in chat, guide the user to /buchung.
- If details are unknown, ask one clarifying question or refer the user to info@agroparknp.ru.
`;

function detectLanguage(text: string) {
  const lower = text.toLowerCase();
  if (/[а-яё]/i.test(text)) return "ru";
  if (/[ğüşöçıİ]/i.test(text) || /\b(saat|bilet|rezerv|açık|kapalı|fiyat)\b/.test(lower)) return "tr";
  return "de";
}

function buildFallbackResponse(userText: string): string {
  const lower = userText.toLowerCase();
  const language = detectLanguage(userText);

  const isOpening =
    lower.includes("öffnungszeit") ||
    lower.includes("geöffnet") ||
    lower.includes("open") ||
    lower.includes("saat") ||
    lower.includes("açık") ||
    lower.includes("когда") ||
    lower.includes("режим") ||
    lower.includes("открыт");

  const isGrill =
    lower.includes("гриль") ||
    lower.includes("grill") ||
    lower.includes("mangal") ||
    lower.includes("домик") ||
    lower.includes("rental");

  const isTicket =
    lower.includes("ticket") ||
    lower.includes("preis") ||
    lower.includes("kosten") ||
    lower.includes("цена") ||
    lower.includes("bilet") ||
    lower.includes("fiyat");

  const isBooking =
    lower.includes("buchung") ||
    lower.includes("reservier") ||
    lower.includes("booking") ||
    lower.includes("rezerv") ||
    lower.includes("бронь");

  const isAttraction =
    lower.includes("attraktion") ||
    lower.includes("activity") ||
    lower.includes("дет") ||
    lower.includes("children") ||
    lower.includes("kurumsal") ||
    lower.includes("корпоратив");

  if (isOpening) {
    if (language === "ru") {
      return "Некрасово поле открыто в сезон с мая по сентябрь, со вторника по воскресенье с 10:00 до 19:00. Понедельник - выходной. Для актуальных вопросов: +7 (911) 474-30-04.";
    }
    if (language === "tr") {
      return "Park sezon boyunca Mayıs-Eylül arasında salıdan pazara 10:00-19:00 saatlerinde açıktır. Pazartesi kapalıdır. Güncel bilgi için: +7 (911) 474-30-04.";
    }
    return "Der Park ist in der Saison Mai bis September von Dienstag bis Sonntag zwischen 10:00 und 19:00 Uhr geöffnet. Montags ist Ruhetag. Für aktuelle Fragen: +7 (911) 474-30-04.";
  }

  if (isGrill) {
    if (language === "ru") {
      return "Гриль-домики можно резервировать для семей, групп и корпоративных встреч. Используйте демо-бронирование на /buchung или напишите на info@agroparknp.ru.";
    }
    if (language === "tr") {
      return "Grill evleri aileler, gruplar ve kurumsal etkinlikler için rezerve edilebilir. Demo rezervasyon için /buchung sayfasını kullanın veya info@agroparknp.ru adresine yazın.";
    }
    return "Grillhäuser können für Familien, Gruppen und Firmenveranstaltungen reserviert werden. Nutzen Sie die Demo-Buchung unter /buchung oder schreiben Sie an info@agroparknp.ru.";
  }

  if (isTicket) {
    if (language === "ru") {
      return "В демо взрослый билет стоит 4,50 €, детский билет 2,50 €, семейный билет 12,00 €. Резервирование проходит через /buchung, оплата показывается только как демо.";
    }
    if (language === "tr") {
      return "Demoda yetişkin bileti 4,50 €, çocuk bileti 2,50 €, aile bileti 12,00 € olarak gösterilir. Rezervasyon /buchung üzerinden yapılır; ödeme demo amaçlıdır.";
    }
    return "In der Demo kostet ein Erwachsenenticket 4,50 €, ein Kinderticket 2,50 € und ein Familienticket 12,00 €. Die Reservierung läuft über /buchung; Zahlung ist nur als Demo dargestellt.";
  }

  if (isBooking) {
    if (language === "ru") {
      return "Вы можете зарезервировать визит через /buchung. Демо создает номер бронирования, сохраняет запись локально и показывает QR-код.";
    }
    if (language === "tr") {
      return "Ziyaretinizi /buchung üzerinden rezerve edebilirsiniz. Demo bir rezervasyon numarası oluşturur, kaydı yerel olarak saklar ve QR kod gösterir.";
    }
    return "Sie können Ihren Besuch direkt über /buchung reservieren. Die Demo erstellt eine Buchungsnummer, speichert die Reservierung lokal und zeigt einen QR-Code.";
  }

  if (isAttraction) {
    if (language === "ru") {
      return "Основные зоны: кукурузный лабиринт, зона животных, музей техники, гриль-домики, ресторан и площадки для мероприятий. Начните с /attraktionen или бронируйте через /buchung.";
    }
    if (language === "tr") {
      return "Başlıca alanlar: mısır labirenti, hayvan alanı, makine müzesi, grill evleri, restoran ve etkinlik alanları. /attraktionen sayfasından başlayabilir veya /buchung üzerinden rezervasyon yapabilirsiniz.";
    }
    return "Die wichtigsten Bereiche sind Maislabyrinth, Tierzone, Maschinenmuseum, Grillhäuser, Restaurant und Eventflächen. Starten Sie auf /attraktionen oder buchen Sie über /buchung.";
  }

  if (language === "ru") {
    return "Я помогу с часами работы, билетами, гриль-домиками, зонами парка и бронированием. Для демо-бронирования используйте /buchung.";
  }
  if (language === "tr") {
    return "Açılış saatleri, biletler, grill evleri, park alanları ve rezervasyon konusunda yardımcı olabilirim. Demo rezervasyon için /buchung sayfasını kullanın.";
  }
  return "Ich helfe mit Öffnungszeiten, Tickets, Grillhäusern, Attraktionen und Reservierungen. Für eine direkte Demo-Buchung nutzen Sie /buchung.";
}

async function streamRealResponse(response: Response, fallbackText: string): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      if (!reader) {
        controller.enqueue(encoder.encode(fallbackText));
        controller.close();
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let sentAny = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(delta));
                sentAny = true;
              }
            } catch {
              // Ignore malformed SSE chunks.
            }
          }
        }
      } catch (err) {
        console.error("Streaming error:", err);
      }

      if (!sentAny) {
        controller.enqueue(encoder.encode(fallbackText));
      }
      controller.close();
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    let body: Partial<ChatRequest>;
    try {
      body = (await req.json()) as Partial<ChatRequest>;
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const normalizedMessages = normalizeMessages(body.messages);
    const userMessages = normalizedMessages.filter((m) => m.role === "user");

    if (userMessages.length === 0) {
      return NextResponse.json({ error: "At least one user message is required." }, { status: 400 });
    }

    const lastUserMessage = userMessages[userMessages.length - 1].content;
    const fallbackText = buildFallbackResponse(lastUserMessage);
    const apiUrl = process.env.AI_API_URL;
    const apiKey = process.env.AI_API_KEY;

    if (!apiUrl || !apiKey) {
      if (FALLBACK_ENABLED) {
        return new NextResponse(fallbackText, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      }
      return NextResponse.json({ error: "AI API is not configured." }, { status: 503 });
    }

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...normalizedMessages,
    ];

    try {
      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "default",
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        console.error("AI API error:", response.status, await response.text());
        if (FALLBACK_ENABLED) {
          return new NextResponse(fallbackText, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache, no-transform",
            },
          });
        }
        return NextResponse.json({ error: "AI service is not responding. Please try again later." }, { status: 502 });
      }

      const stream = await streamRealResponse(response, fallbackText);
      return new NextResponse(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      if (FALLBACK_ENABLED) {
        return new NextResponse(fallbackText, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      }
      return NextResponse.json({ error: "AI service is not responding. Please try again later." }, { status: 502 });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
