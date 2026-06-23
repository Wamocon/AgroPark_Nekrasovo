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

const SYSTEM_PROMPT = `Du bist der KI-Assistent von AgroPark Nekrasovo, einem saisonalen Agritourismus-Park in der Kaliningrader Oblast.

Aufgabe: Beantworte Fragen von Besuchern auf Deutsch, Russisch oder Englisch, hilf bei der Buchung von Tickets und Terminen und beantworte häufige Fragen.

Wichtige Informationen:
- Saison: Mai bis September
- Attraktionen: Maisfeld-Labyrinth, Maschinenmuseum, Tierbereiche, Restaurant, Grillkuppeln
- Kontakt: info@agroparknp.ru, +7 (911) 474-30-04
- Buchung: Besucher können Tickets direkt auf der Website unter /buchung buchen
- Bezahlung: vor Ort oder online
- Sprachen: Russisch, Deutsch, Englisch

Verhalten:
- Sei freundlich, hilfsbereit und prägnant.
- Wenn du eine Buchung nicht abschließen kannst, leite den Nutzer zu /buchung weiter.
- Bei unbekannten Fragen: Bitte den Nutzer, die Details zu wiederholen oder das Team unter info@agroparknp.ru zu kontaktieren.
`;

function buildFallbackResponse(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes("öffnungszeit") || lower.includes("geöffnet") || lower.includes("wann")) {
    return "Der AgroPark Nekrasovo ist in der Saison von Mai bis September geöffnet. Die genauen Öffnungszeiten variieren je nach Monat – aktuelle Zeiten finden Sie auf unserer Website oder im Dashboard.";
  }
  if (lower.includes("ticket") || lower.includes("preis") || lower.includes("kosten")) {
    return "Wir bieten verschiedene Tickets an: Erwachsene ab 4,50 €, Kinder 2,50 €, Familientickets und Gruppenführungen. Buchen können Sie direkt unter /buchung.";
  }
  if (lower.includes("buchung") || lower.includes("reservier")) {
    return "Sie können Tickets und Termine bequem online unter /buchung reservieren. Alternativ erreichen Sie uns per E-Mail unter info@agroparknp.ru oder telefonisch unter +7 (911) 474-30-04.";
  }
  if (lower.includes("attraktion") || lower.includes("labyrinth") || lower.includes("museum")) {
    return "Unsere Highlights sind das Maisfeld-Labyrinth, das Maschinenmuseum, die Tierbereiche, das Restaurant und die Grillkuppeln. Mehr Details finden Sie unter /attraktionen.";
  }
  return "Danke für Ihre Nachricht! Ich bin der KI-Assistent von AgroPark Nekrasovo. Für Buchungen besuchen Sie bitte /buchung oder schreiben Sie uns an info@agroparknp.ru.";
}

async function streamRealResponse(
  response: Response,
  fallbackText: string
): Promise<ReadableStream<Uint8Array>> {
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
              // Ignore malformed SSE chunks
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
      return NextResponse.json(
        { error: "Ungültiges JSON im Anfragekörper." },
        { status: 400 }
      );
    }

    const normalizedMessages = normalizeMessages(body.messages);
    const userMessages = normalizedMessages.filter((m) => m.role === "user");

    if (userMessages.length === 0) {
      return NextResponse.json(
        { error: "Mindestens eine Nutzernachricht erforderlich." },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "KI-API nicht konfiguriert." },
        { status: 503 }
      );
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
        return NextResponse.json(
          { error: "KI-Dienst antwortet nicht. Bitte später erneut versuchen." },
          { status: 502 }
        );
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
      return NextResponse.json(
        { error: "KI-Dienst antwortet nicht. Bitte später erneut versuchen." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
