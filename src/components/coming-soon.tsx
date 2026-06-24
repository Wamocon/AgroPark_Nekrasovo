"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, Loader2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ComingSoonProps {
  title: string;
  description: string;
  eta?: string;
}

export function ComingSoon({ title, description, eta }: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 600));
    try {
      const list = JSON.parse(localStorage.getItem("agropark_waitlist") || "[]");
      list.push({ email, page: title, createdAt: new Date().toISOString() });
      localStorage.setItem("agropark_waitlist", JSON.stringify(list));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <PageShell>
      <section className="flex min-h-[72vh] items-center justify-center bg-[#f6f3ea] py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="accent" className="mb-6"><Clock className="mr-1 size-3" /> В разработке</Badge>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-muted-foreground">{description}</p>
          {eta ? <p className="mt-2 text-sm font-semibold text-green-700">Планируемый этап: {eta}</p> : null}

          {status === "success" ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl bg-green-50 p-4 text-green-900">
              <Check className="size-5" />
              <span>Заявка сохранена. Команда сможет использовать ее в списке интереса.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <Input type="email" inputMode="email" autoComplete="email" name="coming-soon-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail для обновлений" className="flex-1" required />
              <Button type="submit" disabled={status === "submitting"} className="bg-green-900 hover:bg-green-800">
                {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : "Уведомить"}
              </Button>
            </form>
          )}

          <div className="mt-8">
            <Button asChild variant="outline"><Link href="/">На главную <ArrowRight className="ml-2 size-4" /></Link></Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
