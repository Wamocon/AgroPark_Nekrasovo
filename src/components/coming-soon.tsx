import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  eta?: string;
}

export function ComingSoon({ title, description, eta }: ComingSoonProps) {
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

          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="text"
              inputMode="email"
              autoComplete="off"
              name="coming-soon-email"
              placeholder="Ihre E-Mail für Updates"
              className="flex-1"
              suppressHydrationWarning
            />
            <Button type="submit" className="bg-green-900 hover:bg-green-800">
              Benachrichtigen
            </Button>
          </form>

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
