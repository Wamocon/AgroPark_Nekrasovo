"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoAccounts } from "@/data/agropark";

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguagePreference();
  const copy = appCopy[language].login;
  const [email, setEmail] = useState("admin@agropark.demo");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!data.ok) setError(data.error || copy.fallbackError);
      else router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f3ea] px-4 py-10 text-emerald-950 sm:px-6 lg:px-8">
      <div className="mx-auto mb-4 flex max-w-6xl justify-end">
        <LanguageSwitcher />
      </div>
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="space-y-6">
          <BrandLogo />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-emerald-950/68">{copy.lead}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {demoAccounts.map((account, index) => {
              const accountCopy = copy.accounts[index];

              return (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => setEmail(account.email)}
                  className="rounded-lg border border-emerald-950/10 bg-white p-4 text-left shadow-sm transition hover:border-amber-500/50 hover:bg-amber-50"
                >
                  <span className="block text-sm font-black">{accountCopy.role}</span>
                  <span className="mt-1 block text-xs text-emerald-950/58">{account.email}</span>
                  <span className="mt-3 block text-xs leading-5 text-emerald-950/58">{accountCopy.scope}</span>
                </button>
              );
            })}
          </div>
        </section>

        <Card className="border-emerald-950/10 bg-white/94 shadow-2xl shadow-emerald-950/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <ShieldCheck className="size-5 text-amber-700" />
              {copy.formTitle}
            </CardTitle>
            <CardDescription>
              {copy.formDescription} <strong>password</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-950/42" />
                  <Input id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} className="pl-10" autoComplete="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{copy.passwordLabel}</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-950/42" />
                  <Input id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} className="pl-10" type="password" autoComplete="current-password" />
                </div>
              </div>
              {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p> : null}
              <Button type="submit" disabled={loading} className="w-full bg-emerald-800 hover:bg-emerald-900">
                {loading ? copy.loading : copy.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
