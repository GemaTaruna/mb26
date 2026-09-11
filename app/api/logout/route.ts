/**
 * app/api/logout/route.ts
 * POST /api/logout
 * Hapus session cookie peserta.
 */

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function POST() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await getIronSession<SessionData>(cookies() as any, sessionOptions);
    session.destroy();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/logout] Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
