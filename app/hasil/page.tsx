/**
 * app/hasil/page.tsx — Halaman Hasil Seleksi (Server Component)
 * Dilindungi session. Fetch data peserta server-side — tidak bocor ke client.
 */

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions, type SessionData } from "@/lib/session";
import { findParticipantByNIS } from "@/lib/sheets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultDisplay from "@/components/ResultDisplay";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HasilPage() {
  // Cek session
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getIronSession<SessionData>(cookies() as any, sessionOptions);

  if (!session.isLoggedIn || !session.nis) {
    redirect("/login");
  }

  // Ambil data peserta dari Google Sheets (server-side only)
  let participant = null;
  let fetchError: string | null = null;

  try {
    participant = await findParticipantByNIS(session.nis);
  } catch {
    fetchError =
      "Terjadi gangguan saat mengambil data. Silakan coba beberapa saat lagi.";
  }

  // NIS ada di session tapi tidak ada di sheet (data mungkin dihapus)
  if (!participant && !fetchError) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-8 md:py-10">
        {fetchError ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-700 font-medium">{fetchError}</p>
              <Link
                href="/"
                className="inline-block mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Kembali ke halaman utama
              </Link>
            </div>
          </div>
        ) : (
          <ResultDisplay participant={participant!} />
        )}
      </main>
      <Footer />
    </div>
  );
}
