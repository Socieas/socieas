// app/api/tools/premium-unlock/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { code?: string };

    const raw = process.env.PREMIUM_UNLOCK_CODES || "";
    const codes = raw
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length > 0);

    const given = (body.code || "").trim().toUpperCase();
    const ok = given.length > 0 && codes.includes(given);

    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
