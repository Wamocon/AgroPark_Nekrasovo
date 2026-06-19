"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@agropark.demo");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Anmeldung fehlgeschlagen.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Netzwerkfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell className="flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-900 text-white">
            <Leaf className="size-6" />
          </div>
          <CardTitle className="text-2xl">Anmelden</CardTitle>
          <CardDescription>
            Melden Sie sich mit einem Demo-Account an
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 hover:bg-green-800"
            >
              {loading ? "Wird angemeldet..." : "Anmelden"}
            </Button>
          </form>

          <div className="mt-6 rounded-lg bg-neutral-50 p-4 text-xs text-neutral-600">
            <p className="mb-2 font-semibold">Demo-Accounts:</p>
            <ul className="space-y-1">
              <li>admin@agropark.demo / password</li>
              <li>manager@agropark.demo / password</li>
              <li>staff@agropark.demo / password</li>
              <li>visitor@agropark.demo / password</li>
            </ul>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="text-green-700 hover:underline">
              Zurück zur Startseite
            </Link>
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
