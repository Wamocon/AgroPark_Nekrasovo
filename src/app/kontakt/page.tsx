"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Check, Loader2 } from "lucide-react";

export default function ContactPage() {
 const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
 const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

 function handleChange(
 e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) {
 setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 }

 async function handleSubmit(e: React.FormEvent) {
 e.preventDefault();
 if (!form.name || !form.email || !form.message) return;

 setStatus("submitting");

 // Demo: simulate API call and store locally
 await new Promise((resolve) => setTimeout(resolve, 800));
 try {
 const inquiries = JSON.parse(localStorage.getItem("agropark_inquiries") || "[]");
 inquiries.push({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
 localStorage.setItem("agropark_inquiries", JSON.stringify(inquiries));
 setStatus("success");
 setForm({ name: "", email: "", subject: "", message: "" });
 } catch {
 setStatus("error");
 }
 }

 return (
 <PageShell>
 <section className="bg-gradient-to-br from-green-900 to-green-800 py-20 text-white">
 <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
 <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Kontakt</h1>
 <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
 Haben Sie Fragen? Schreiben Sie uns oder nutzen Sie den KI-Chat.
 </p>
 </div>
 </section>

 <section className="py-16">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 <div className="grid gap-8 lg:grid-cols-3">
 <div className="lg:col-span-2">
 <SectionHeader
 title="Nachricht senden"
 description="Wir melden uns innerhalb von 24 Stunden bei Ihnen."
 />
 <Card>
 <CardContent className="p-6">
 {status === "success" ? (
 <div className="rounded-xl bg-green-50 p-8 text-center">
 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-900 text-white">
 <Check className="size-7" />
 </div>
 <h3 className="text-xl font-bold text-green-900">Nachricht gesendet</h3>
 <p className="mt-2 text-neutral-600">
 Vielen Dank, {form.name || "für Ihre Nachricht"}. Wir melden uns zeitnah bei Ihnen.
 </p>
 <Button
 onClick={() => setStatus("idle")}
 className="mt-6 bg-green-900 hover:bg-green-800"
 >
 Neue Nachricht
 </Button>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-4">
 <div className="grid gap-4 sm:grid-cols-2">
 <div className="space-y-2">
 <Label htmlFor="name">Name</Label>
 <Input
 id="name"
 name="name"
 value={form.name}
 onChange={handleChange}
 placeholder="Ihr Name"
 required
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="email">E-Mail</Label>
 <Input
 id="email"
 name="email"
 type="email"
 value={form.email}
 onChange={handleChange}
 placeholder="ihre@email.de"
 required
 />
 </div>
 </div>
 <div className="space-y-2">
 <Label htmlFor="subject">Betreff</Label>
 <Input
 id="subject"
 name="subject"
 value={form.subject}
 onChange={handleChange}
 placeholder="Worum geht es?"
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="message">Nachricht</Label>
 <Textarea
 id="message"
 name="message"
 value={form.message}
 onChange={handleChange}
 rows={5}
 placeholder="Ihre Nachricht..."
 required
 />
 </div>
 {status === "error" && (
 <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
 Fehler beim Senden. Bitte versuchen Sie es erneut.
 </div>
 )}
 <Button
 type="submit"
 disabled={status === "submitting"}
 className="bg-green-900 hover:bg-green-800"
 >
 {status === "submitting" ? (
 <>
 <Loader2 className="mr-2 size-4 animate-spin" /> Wird gesendet…
 </>
 ) : (
 "Nachricht senden"
 )}
 </Button>
 </form>
 )}
 </CardContent>
 </Card>
 </div>

 <div className="space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Kontaktdaten</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <a
 href="mailto:info@agroparknp.ru"
 className="flex min-h-10 items-center gap-3 text-sm text-neutral-600 hover:text-green-900"
 >
 <Mail className="size-4 text-green-700" />
 info@agroparknp.ru
 </a>
 <a
 href="tel:+79114743004"
 className="flex min-h-10 items-center gap-3 text-sm text-neutral-600 hover:text-green-900"
 >
 <Phone className="size-4 text-green-700" />
 +7 (911) 474-30-04
 </a>
 <span className="flex items-start gap-3 text-sm text-neutral-600">
 <MapPin className="mt-0.5 size-4 text-green-700" />
 Kaliningrader Oblast, Russland
 </span>
 <span className="flex items-start gap-3 text-sm text-neutral-600">
 <Clock className="mt-0.5 size-4 text-green-700" />
 Saison: Mai - September
 </span>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 </section>
 </PageShell>
 );
}
