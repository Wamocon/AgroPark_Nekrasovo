"use server";

import { cookies } from "next/headers";
import { User, UserRole } from "./auth";

const DEMO_USERS: Record<string, { password: string; name: string; role: UserRole }> = {
  "admin@agropark.demo": { password: "password", name: "Administrator", role: "admin" },
  "manager@agropark.demo": { password: "password", name: "Park Manager", role: "manager" },
  "staff@agropark.demo": { password: "password", name: "Mitarbeiter", role: "staff" },
  "visitor@agropark.demo": { password: "password", name: "Besucher", role: "visitor" },
};

const SESSION_COOKIE = "agropark_session";

export async function login(email: string, password: string): Promise<User | null> {
  const demo = DEMO_USERS[email.toLowerCase()];
  if (!demo || demo.password !== password) return null;

  const user: User = {
    email: email.toLowerCase(),
    name: demo.name,
    role: demo.role,
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return user;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  try {
    return JSON.parse(session) as User;
  } catch {
    return null;
  }
}
