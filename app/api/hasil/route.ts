/**
 * app/api/hasil/route.ts
 * GET /api/hasil
 * Mengembalikan data peserta yang sedang login.
 * Hanya data milik NIS dalam session yang dikembalikan.
 */

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { findParticipantByNIS } from "@/lib/sheets";

export async function GET() {
  try {
    /* ── Cek session ──────────────────────────────────── */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await getIronSession<SessionData>(cookies() as any, sessionOptions);

    if (!session.isLoggedIn || !session.nis) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ── Ambil data peserta ───────────────────────────── */
    const participant = await findParticipantByNIS(session.nis);

    if (!participant) {
      return NextResponse.json(
        { error: "Data peserta tidak ditemukan." },
        { status: 404 }
      );
    }

    /* ── Return HANYA data peserta ini ───────────────── */
    return NextResponse.json({
      nis:           participant.nis,
      nama:          participant.nama,
      alat:          participant.alat,
      kelas:         participant.kelas,
      hasilSeleksi:  participant.hasilSeleksi,
      keterangan:    participant.keterangan,
      linkSertifikat: participant.linkSertifikat,
    });
  } catch (err) {
    console.error("[/api/hasil] Error:", err);
    return NextResponse.json(
      { error: "Terjadi gangguan saat mengambil data." },
      { status: 500 }
    );
  }
}
