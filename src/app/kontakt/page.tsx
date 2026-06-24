"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { Bot, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { agroparkContact, aiAutomations } from "@/data/agropark";

type FormState = { name: string; company: string; email: string; message: string };

const initialForm: FormState = { name: "", company: "", email: "", message: "" };

export default function ContactPage() {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].contact;
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inquiries = JSON.parse(localStorage.getItem("agropark_inquiries") || "[]");
    inquiries.unshift({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("agropark_inquiries", JSON.stringify(inquiries));
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#f6f3ea] pt-24 text-emerald-950">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{copy.eyebrow}</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-950/68">{copy.lead}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {copy.automations.map((automation, index) => {
                    const Icon = aiAutomations[index].icon;

                    return (
                      <article key={automation.title} className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm">
                        <Icon className="mb-4 size-5 text-amber-700" />
                        <h2 className="text-base font-black">{automation.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-emerald-950/64">{automation.detail}</p>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-6">
                <Card className="border-emerald-950/10 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="size-5 text-amber-700" />
                      {copy.formTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-900">
                        <CheckCircle2 className="mr-2 inline size-4" />
                        {copy.saved}
                      </div>
                    ) : null}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{copy.labels.name}</Label>
                          <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder={copy.placeholders.name} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{copy.labels.email}</Label>
                          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">{copy.labels.company}</Label>
                        <Input id="company" name="company" value={form.company} onChange={handleChange} placeholder={copy.placeholders.company} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{copy.labels.message}</Label>
                        <Textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} placeholder={copy.placeholders.message} required />
                      </div>
                      <Button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-900">
                        {copy.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-emerald-950/10 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>{copy.contactTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a href={agroparkContact.emailHref} className="flex min-h-10 items-center gap-3 text-sm text-emerald-950/68 hover:text-emerald-900">
                      <Mail className="size-4 text-amber-700" />
                      {agroparkContact.email}
                    </a>
                    <a href={agroparkContact.phoneHref} className="flex min-h-10 items-center gap-3 text-sm text-emerald-950/68 hover:text-emerald-900">
                      <Phone className="size-4 text-amber-700" />
                      {agroparkContact.phone}
                    </a>
                    <span className="flex min-h-10 items-center gap-3 text-sm text-emerald-950/68">
                      <MessageCircle className="size-4 text-amber-700" />
                      WhatsApp: {agroparkContact.whatsapp}
                    </span>
                    <span className="flex min-h-10 items-start gap-3 text-sm text-emerald-950/68">
                      <MapPin className="mt-1 size-4 text-amber-700" />
                      {copy.region}
                    </span>
                    <span className="flex min-h-10 items-start gap-3 text-sm text-emerald-950/68">
                      <Bot className="mt-1 size-4 text-amber-700" />
                      {copy.aiSafety}
                    </span>
                  </CardContent>
                </Card>

                <Card className="border-emerald-950/10 bg-emerald-950 text-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="size-5 text-amber-200" />
                      {copy.quickTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-2">
                    <Button asChild className="bg-amber-300 text-emerald-950 hover:bg-amber-200">
                      <Link href="/buchung">{copy.quickBooking}</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-white/20 bg-white/8 text-white hover:bg-white/12 hover:text-white">
                      <Link href="/login">{copy.quickLogin}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
