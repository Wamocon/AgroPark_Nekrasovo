"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./brand-logo";
import { Menu, X } from "lucide-react";

const navLinks = [
 { href: "/", label: "Startseite" },
 { href: "/park", label: "Park" },
 { href: "/attraktionen", label: "Attraktionen" },
 { href: "/buchung", label: "Buchung" },
 { href: "/dashboard", label: "CRM" },
 { href: "/proposal.html", label: "Pitch" },
];

export function Navbar() {
 const [scrolled, setScrolled] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);
 const [progress, setProgress] = useState(0);
 const pathname = usePathname();

 useEffect(() => {
 const handleScroll = () => {
 const scrollTop = window.scrollY;
 const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 setScrolled(scrollTop > 20);
 setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
 };

 window.addEventListener("scroll", handleScroll, { passive: true });
 handleScroll();
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
 <>
 <header
 className={cn(
 "fixed left-0 right-0 top-0 z-50 border-b border-transparent transition-all duration-300",
 scrolled
 ? "h-14 border-border bg-background/92 shadow-sm backdrop-blur-xl"
 : "h-16 bg-background/80 backdrop-blur-md"
 )}
 >
 <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
 <BrandLogo className="min-h-11" />

 <ul className="hidden items-center gap-7 lg:flex">
 {navLinks.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className={cn(
 "relative inline-flex min-h-10 min-w-10 items-center justify-center px-2 text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-emerald-950",
 pathname === link.href && "text-emerald-950"
 )}
 >
 {link.label}
 <span
 className={cn(
 "absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-800 transition-all duration-300",
 pathname === link.href && "w-full"
 )}
 />
 </Link>
 </li>
 ))}
 </ul>

 <div className="hidden items-center gap-3 lg:flex">
 <Button asChild variant="ghost" size="sm">
 <Link href="/login">Demo-Login</Link>
 </Button>
 <Button asChild size="sm" className="bg-emerald-900 hover:bg-emerald-800">
 <Link href="/kontakt">Kontakt</Link>
 </Button>
 </div>

 <button
 className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
 onClick={() => setMobileOpen(!mobileOpen)}
 aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
 aria-expanded={mobileOpen}
 >
 {mobileOpen ? (
 <X className="size-5 text-emerald-950" />
 ) : (
 <Menu className="size-5 text-emerald-950" />
 )}
 </button>
 </nav>

 <div
 className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-900 via-emerald-600 to-amber-500 transition-all duration-100"
 style={{ width: `${progress}%` }}
 aria-hidden="true"
 />
 </header>

 <div
 className={cn(
 "fixed inset-0 top-14 z-40 bg-background/96 backdrop-blur-xl transition-transform duration-300 lg:hidden",
 mobileOpen ? "translate-x-0" : "translate-x-full"
 )}
 aria-hidden={!mobileOpen}
 >
 <ul className="flex flex-col gap-2 p-6">
 {navLinks.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 onClick={() => setMobileOpen(false)}
 className={cn(
 "block rounded-lg px-4 py-3 text-base font-bold text-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-950",
 pathname === link.href && "bg-emerald-50 text-emerald-950"
 )}
 >
 {link.label}
 </Link>
 </li>
 ))}
 <li className="mt-4 flex flex-col gap-3">
 <Button asChild variant="outline" className="w-full">
 <Link href="/login" onClick={() => setMobileOpen(false)}>
 Demo-Login
 </Link>
 </Button>
 <Button asChild className="w-full bg-emerald-900 hover:bg-emerald-800">
 <Link href="/kontakt" onClick={() => setMobileOpen(false)}>
 Kontakt
 </Link>
 </Button>
 </li>
 </ul>
 </div>
 </>
 );
}
