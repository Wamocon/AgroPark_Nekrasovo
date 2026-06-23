"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
 id: string;
 role: "user" | "assistant";
 content: string;
}

function generateId() {
 return Math.random().toString(36).substring(2, 9);
}

export function ChatWidget() {
 const [open, setOpen] = useState(false);
 const [messages, setMessages] = useState<Message[]>([
 {
 id: "welcome",
 role: "assistant",
 content:
 "Hallo! Ich bin der KI-Assistent von AgroPark Nekrasovo. Fragen Sie mich zu Öffnungszeiten, Tickets, Grillhäusern, Attraktionen oder Buchungen.",
 },
 ]);
 const [input, setInput] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const scrollRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (scrollRef.current) {
 scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
 }
 }, [messages, loading]);

 useEffect(() => {
 const handler = () => setOpen(true);
 window.addEventListener("agropark:open-chat", handler);
 return () => window.removeEventListener("agropark:open-chat", handler);
 }, []);

 async function handleSubmit(e: React.FormEvent) {
 e.preventDefault();
 if (!input.trim() || loading) return;

 const userMsg: Message = { id: generateId(), role: "user", content: input.trim() };
 setMessages((prev) => [...prev, userMsg]);
 setInput("");
 setLoading(true);
 setError(null);

 try {
 const response = await fetch("/api/chat", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 messages: [
 { role: "user", content: userMsg.content },
 ],
 }),
 });

 if (!response.ok) {
 const data = await response.json().catch(() => ({}));
 throw new Error(data.error || "Fehler beim Senden der Nachricht.");
 }

 const reader = response.body?.getReader();
 if (!reader) {
 throw new Error("Keine Antwort vom Server erhalten.");
 }

 const assistantId = generateId();
 setMessages((prev) => [
 ...prev,
 { id: assistantId, role: "assistant", content: "" },
 ]);

 const decoder = new TextDecoder();
 let done = false;
 let fullContent = "";

 while (!done) {
 const { value, done: streamDone } = await reader.read();
 done = streamDone;
 if (value) {
 const chunk = decoder.decode(value, { stream: true });
 fullContent += chunk;
 setMessages((prev) =>
 prev.map((m) =>
 m.id === assistantId ? { ...m, content: fullContent } : m
 )
 );
 }
 }
 } catch (err) {
 setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
 } finally {
 setLoading(false);
 }
 }

 return (
 <>
 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0, scale: 0.9, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9, y: 20 }}
 transition={{ duration: 0.2 }}
 className="fixed bottom-4 right-4 z-[60] flex h-[60dvh] max-h-[500px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-6 sm:right-6"
 >
 <div className="flex items-center justify-between bg-gradient-to-r from-green-900 to-green-800 px-4 py-3 text-white">
 <div className="flex items-center gap-2">
 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
 <Bot className="size-4" />
 </div>
 <div>
 <div className="text-sm font-bold">AgroPark Assist</div>
 <div className="text-[10px] opacity-80">DE / RU / TR, Demo-Antworten sofort</div>
 </div>
 </div>
 <button
 onClick={() => setOpen(false)}
 className="rounded-full p-1 hover:bg-white/20"
 aria-label="Chat schließen"
 >
 <X className="size-4" />
 </button>
 </div>

 <div
 ref={scrollRef}
 className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
 >
 {messages.map((msg) => (
 <div
 key={msg.id}
 data-testid={msg.role === "assistant" ? "chat-message" : undefined}
 data-role={msg.role}
 className={cn(
 "flex w-max max-w-[85%] items-start gap-2 rounded-2xl px-3 py-2 text-sm",
 msg.role === "user"
 ? "ml-auto rounded-br-none bg-green-900 text-white"
 : "rounded-bl-none bg-neutral-100 text-foreground"
 )}
 >
 {msg.role === "assistant" && (
 <Bot className="mt-0.5 size-4 shrink-0 text-green-700" />
 )}
 {msg.role === "user" && (
 <User className="mt-0.5 size-4 shrink-0 text-white/80" />
 )}
 <span className="whitespace-pre-wrap">{msg.content}</span>
 </div>
 ))}
 {loading && (
 <div className="flex w-max max-w-[85%] items-center gap-2 rounded-2xl rounded-bl-none bg-neutral-100 px-3 py-2 text-sm text-foreground">
 <Loader2 className="size-4 animate-spin text-green-700" />
 <span className="text-xs text-neutral-600">Antwort wird erstellt...</span>
 </div>
 )}
 {error && (
 <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
 {error}
 </div>
 )}
 </div>

 <form
 onSubmit={handleSubmit}
 className="relative z-10 flex items-center gap-2 border-t border-border bg-card p-3"
 >
 <Input
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Nachricht schreiben..."
 className="flex-1"
 disabled={loading}
 />
 <Button
 type="submit"
 size="icon"
 disabled={!input.trim() || loading}
 className="bg-green-900 hover:bg-green-800"
 >
 <Send className="size-4" />
 </Button>
 </form>
 </motion.div>
 )}
 </AnimatePresence>

 {!open && (
 <motion.button
 initial={{ scale: 0.8, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.8, opacity: 0 }}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-green-900 text-white shadow-lg shadow-green-900/30 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
 aria-label="Chat öffnen"
 >
 <MessageCircle className="size-6" />
 </motion.button>
 )}
 </>
 );
}
