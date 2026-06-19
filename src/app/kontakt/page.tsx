import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
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
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Ihr Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input id="email" type="email" placeholder="ihre@email.de" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Betreff</Label>
                      <Input id="subject" placeholder="Worum geht es?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Nachricht</Label>
                      <Textarea id="message" rows={5} placeholder="Ihre Nachricht..." />
                    </div>
                    <Button type="submit" className="bg-green-900 hover:bg-green-800">
                      Nachricht senden
                    </Button>
                  </form>
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
                    className="flex items-center gap-3 text-sm text-neutral-600 hover:text-green-900"
                  >
                    <Mail className="size-4 text-green-700" />
                    info@agroparknp.ru
                  </a>
                  <a
                    href="tel:+79114743004"
                    className="flex items-center gap-3 text-sm text-neutral-600 hover:text-green-900"
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
                    Saison: Mai – September
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
