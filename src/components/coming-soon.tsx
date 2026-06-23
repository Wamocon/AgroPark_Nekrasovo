"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Check, Loader2 } from "lucide-react";

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
 <section className="flex flex-1 items-center justify-center py-24">
 <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
 <Badge variant="accent" className="mb-6">
 <Clock className="mr-1 size-3" /> Coming Soon
 </Badge>
 <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
 {title}
 </h1>
 <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
 {description}
 </p>
 {eta && (
 <p className="mt-2 text-sm font-semibold text-green-700">
 Geplante Veröffentlichung: {eta}
 </p>
 )}

 {status === "success" ? (
 <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl bg-green-50 p-4 text-green-900">
 <Check className="size-5" />
 <span>Sie sind auf der Warteliste. Wir informieren Sie, sobald es losgeht.</span>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
 <Input
 type="email"
 inputMode="email"
 autoComplete="email"
 name="coming-soon-email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Ihre E-Mail für Updates"
 className="flex-1"
 required
 />
 <Button
 type="submit"
 disabled={status === "submitting"}
 className="bg-green-900 hover:bg-green-800"
 >
 {status === "submitting" ? (
 <Loader2 className="size-4 animate-spin" />
 ) : (
 "Benachrichtigen"
 )}
 </Button>
 </form>
 )}

 <div className="mt-8">
 <Button asChild variant="outline">
 <Link href="/">
 Zurück zur Startseite <ArrowRight className="ml-2 size-4" />
 </Link>
 </Button>
 </div>
 </div>
 </section>
 </PageShell>
 );
}
