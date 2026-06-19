"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <AmbientBackground variant="accent" intensity="normal" className="py-24 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,163,115,0.2),transparent_70%)]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,163,115,0.2),transparent_70%)]"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <TiltCard tiltAmount={4} className="rounded-3xl">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-md sm:p-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-black tracking-tight text-white sm:text-5xl"
              >
                Bereit für die nächste Phase?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80"
              >
                Lassen Sie uns den Scope für Phase 1 finalisieren und innerhalb von 30
                Tagen erste messbare Ergebnisse liefern.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-accent-500 text-white shadow-lg shadow-accent-500/25 hover:bg-accent-600"
                >
                  <Link href="/kontakt">
                    Kontakt aufnehmen <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15"
                >
                  <Link href="/buchung">Ticket buchen</Link>
                </Button>
              </motion.div>
            </div>
          </TiltCard>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
          >
            <a href="mailto:info@agroparknp.ru" className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="size-4" /> info@agroparknp.ru
            </a>
            <a href="tel:+79114743004" className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="size-4" /> +7 (911) 474-30-04
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> Kaliningrader Oblast
            </span>
          </motion.div>
        </div>
      </AmbientBackground>
    </section>
  );
}
