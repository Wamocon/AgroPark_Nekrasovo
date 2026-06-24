import { NextResponse } from "next/server";
import { login } from "@/lib/auth-actions";
export async function POST(request: Request) { const body = await request.json().catch(() => ({})); const result = await login(String(body.email || ""), String(body.password || "")); return NextResponse.json(result, { status: result.ok ? 200 : 401 }); }
