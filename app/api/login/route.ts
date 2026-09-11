/**
 * app/api/login/route.ts
 * POST /api/login
 * Validasi NIS peserta terhadap Google Sheets, set session cookie jika valid.
 */

export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { findParticipantByNIS } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nis: string = (body?.nis ?? "").toString().trim();

    /* ── Validasi input dasar ─────────────────────────── */
    if (!nis) {
      return NextResponse.json(
        { success: false, message: "NIS tidak boleh kosong." },
        { status: 400 }
      );
    }

    /* ── Cari peserta di Google Sheets ───────────────── */
    const participant = await findParticipantByNIS(nis);

    if (!participant) {
      // PENTING: jangan bocorkan apakah NIS terdaftar atau tidak
      return NextResponse.json(
        {
          success: false,
          message:
            "Data yang Anda masukkan tidak ditemukan. Silakan periksa kembali NIS Anda.",
        },
        { status: 401 }
      );
    }

    /* ── Set session cookie ───────────────────────────── */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await getIronSession<SessionData>(cookies() as any, sessionOptions);
    session.nis        = participant.nis;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/login] Error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi gangguan saat mengambil data. Silakan coba beberapa saat lagi.",
      },
      { status: 500 }
    );
  }
}
