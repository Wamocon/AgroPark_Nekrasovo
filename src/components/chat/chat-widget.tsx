"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

const STORAGE_KEY = "agropark_prelogin_chat_count";

export function ChatWidget({ hideMobileTrigger = false }: { hideMobileTrigger?: boolean }) {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].chat;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: copy.welcome,
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("agropark:open-chat", handler);
    return () => window.removeEventListener("agropark:open-chat", handler);
  }, []);

  useEffect(() => {
    setMessages((current) => {
      if (current.length !== 1 || current[0].id !== "welcome") return current;
      return [{ ...current[0], content: copy.welcome }];
    });
  }, [copy.welcome]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = input.trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const previousCount = Number(localStorage.getItem(STORAGE_KEY) || "0");
      localStorage.setItem(STORAGE_KEY, String(previousCount + 1));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });
      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply || copy.fallback,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: copy.offline,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70]">
      {open ? (
        <div className="flex h-[560px] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-2xl shadow-emerald-950/20">
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-950 to-emerald-800 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Bot className="size-4" />
              </div>
              <div>
                <div className="text-sm font-bold">AgroPark AI Assist</div>
                <div className="text-[10px] opacity-80">{copy.subtitle}</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/20"
              aria-label={copy.close}
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f6f3ea] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6",
                  message.role === "user"
                    ? "ml-auto bg-emerald-900 text-white"
                    : "bg-white text-emerald-950 shadow-sm",
                )}
              >
                {message.content}
              </div>
            ))}
            {loading ? (
              <div className="max-w-[86%] rounded-2xl bg-white px-4 py-3 text-sm text-emerald-950 shadow-sm">
                {copy.loading}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-emerald-950/10 p-3"
          >
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={copy.placeholder}
              aria-label={copy.inputLabel}
            />
            <Button
              type="submit"
              aria-label={copy.sendLabel}
              disabled={loading || !input.trim()}
              className="bg-emerald-800 hover:bg-emerald-900"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      ) : (
        <Button
          size="lg"
          aria-label={copy.open}
          className={cn(
            hideMobileTrigger && "hidden md:inline-flex",
            "h-14 w-14 rounded-full bg-emerald-800 p-0 shadow-xl shadow-emerald-950/20 hover:bg-emerald-900 sm:h-12 sm:w-auto sm:px-5",
          )}
          onClick={() => setOpen(true)}
        >
          <Bot className="size-5 sm:mr-2 sm:size-4" />
          <span className="sr-only sm:not-sr-only">{copy.button}</span>
        </Button>
      )}
    </div>
  );
}
