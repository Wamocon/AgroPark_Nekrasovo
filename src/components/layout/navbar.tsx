"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/park", label: "Der Park" },
  { href: "/attraktionen", label: "Attraktionen" },
  { href: "/buchung", label: "Tickets" },
  { href: "/dashboard", label: "Dashboard" },
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
          "fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300",
          scrolled
            ? "h-14 bg-background/85 backdrop-blur-xl border-border shadow-sm"
            : "h-16 bg-background/60 backdrop-blur-md"
        )}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-green-900">
            <Leaf className="size-5 text-accent-500" />
            <span className="text-sm font-extrabold tracking-tight">
              AGROPARK <span className="text-accent-500">DIGITAL</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-green-900",
                    pathname === link.href && "text-green-900"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 w-0 bg-green-800 transition-all duration-300",
                      pathname === link.href && "w-full"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Anmelden</Link>
            </Button>
            <Button asChild size="sm" className="bg-green-900 hover:bg-green-800">
              <Link href="/kontakt">Kontakt</Link>
            </Button>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="size-5 text-green-900" />
            ) : (
              <Menu className="size-5 text-green-900" />
            )}
          </button>
        </nav>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-green-900 via-green-600 to-accent-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-xl transition-transform duration-300 md:hidden",
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
                  "block rounded-lg px-4 py-3 text-base font-bold text-foreground transition-colors hover:bg-green-100 hover:text-green-900",
                  pathname === link.href && "bg-green-100 text-green-900"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-4 flex flex-col gap-3">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                Anmelden
              </Link>
            </Button>
            <Button asChild className="w-full bg-green-900 hover:bg-green-800">
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
