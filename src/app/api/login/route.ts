import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth-actions";

export async function POST(req: NextRequest) {
 try {
 const { email, password } = await req.json();

 if (!email || !password) {
 return NextResponse.json(
 { error: "E-Mail und Passwort erforderlich." },
 { status: 400 }
 );
 }

 const user = await login(email, password);
 if (!user) {
 return NextResponse.json(
 { error: "Ungültige E-Mail oder Passwort." },
 { status: 401 }
 );
 }

 return NextResponse.json({ success: true, user });
 } catch (error) {
 console.error("Login API error:", error);
 return NextResponse.json(
 { error: "Interner Serverfehler." },
 { status: 500 }
 );
 }
}
