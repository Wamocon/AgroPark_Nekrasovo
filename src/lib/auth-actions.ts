"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { DemoUser } from "@/lib/auth";
const COOKIE_NAME = "agropark_session";
const PASSWORD = "password";
const users: Record<string, DemoUser> = {
  "admin@agropark.demo": { email: "admin@agropark.demo", name: "Директор АгроПарка", role: "admin" },
  "manager@agropark.demo": { email: "manager@agropark.demo", name: "Менеджер бронирований", role: "manager" },
  "staff@agropark.demo": { email: "staff@agropark.demo", name: "Администратор смены", role: "staff" },
  "visitor@agropark.demo": { email: "visitor@agropark.demo", name: "Demo-гость", role: "visitor" },
};
export async function login(email: string, password: string) { const normalized = email.trim().toLowerCase(); const user = users[normalized]; if (!user || password !== PASSWORD) return { ok: false, error: "Проверьте e-mail и пароль demo-доступа." }; const jar = await cookies(); jar.set(COOKIE_NAME, Buffer.from(JSON.stringify(user)).toString("base64url"), { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 8, path: "/" }); return { ok: true, user }; }
export async function getCurrentUser(): Promise<DemoUser | null> { const jar = await cookies(); const raw = jar.get(COOKIE_NAME)?.value; if (!raw) return null; try { const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as DemoUser; return users[parsed.email] ? parsed : null; } catch { return null; } }
export async function logout() { const jar = await cookies(); jar.delete(COOKIE_NAME); redirect("/login"); }
