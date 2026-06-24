"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, Loader2 } from "lucide-react";
import { appCopy, type ComingSoonPageKey } from "@/components/i18n/app-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ComingSoonProps {
  pageKey: ComingSoonPageKey;
}

export function ComingSoon({ pageKey }: ComingSoonProps) {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].comingSoon;
  const page = copy.pages[pageKey];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 600));
    try {
      const list = JSON.parse(localStorage.getItem("agropark_waitlist") || "[]");
      list.push({ email, page: page.title, createdAt: new Date().toISOString() });
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
          <Badge variant="accent" className="mb-6">
            <Clock className="mr-1 size-3" />
            {copy.badge}
          </Badge>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">{page.title}</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-muted-foreground">{page.description}</p>
          <p className="mt-2 text-sm font-semibold text-green-700">
            {copy.etaPrefix} {page.eta}
          </p>

          {status === "success" ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl bg-green-50 p-4 text-green-900">
              <Check className="size-5" />
              <span>{copy.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <Input type="email" inputMode="email" autoComplete="email" name="coming-soon-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={copy.placeholder} className="flex-1" required />
              <Button type="submit" disabled={status === "submitting"} className="bg-green-900 hover:bg-green-800">
                {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : copy.notify}
              </Button>
            </form>
          )}

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/">
                {copy.home}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
