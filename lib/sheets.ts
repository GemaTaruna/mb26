/**
 * lib/sheets.ts
 * Mengambil dan memparse data peserta dari Google Sheets (public CSV export).
 * Semua operasi dilakukan di server-side — data tidak pernah dikirim ke browser secara bulk.
 */

const SHEET_ID =
  process.env.NEXT_PUBLIC_SHEET_ID ||
  "1bP2El87Ak4PzPIfDOgZE-n9oIIx4skmxDI0xr5ZTYCY";

export interface Participant {
  no: string;
  nis: string;
  nama: string;
  alat: string;
  kelas: string;
  hasilSeleksi: string;
  keterangan: string;
  linkSertifikat: string;
  statusPdf: string;
}

/**
 * Parse satu baris CSV dengan benar, termasuk field yang dikuotasi.
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // escaped quote: "" → "
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else if (char === "\r") {
      // abaikan carriage return (Windows line ending)
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Ambil semua peserta dari Google Sheets via public CSV export.
 * Hanya dipanggil dari server-side (API routes / Server Components).
 */
export async function fetchAllParticipants(): Promise<Participant[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

  let response: Response;
  try {
    response = await fetch(url, {
      cache: "no-store", // Selalu ambil data terbaru
      next: { revalidate: 0 },
    });
  } catch {
    throw new Error(
      "Gagal terhubung ke Google Sheets. Periksa koneksi internet server."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Google Sheets mengembalikan error ${response.status}. Pastikan spreadsheet bersifat publik.`
    );
  }

  const text = await response.text();
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  if (lines.length < 2) return [];

  // Baris pertama (index 0) = header, lewati
  return lines
    .slice(1)
    .map((line) => {
      const v = parseCSVLine(line);
      return {
        no:            (v[0] ?? "").trim(),
        nis:           (v[1] ?? "").trim(),
        nama:          (v[2] ?? "").trim(),
        alat:          (v[3] ?? "").trim(),
        kelas:         (v[4] ?? "").trim(),
        hasilSeleksi:  (v[5] ?? "").trim(),
        keterangan:    (v[6] ?? "").trim(),
        linkSertifikat:(v[7] ?? "").trim(),
        statusPdf:     (v[8] ?? "").trim(),
      };
    })
    .filter((p) => p.nis !== ""); // Abaikan baris kosong
}

/**
 * Cari peserta berdasarkan NIS. Return null jika tidak ditemukan.
 */
export async function findParticipantByNIS(
  nis: string
): Promise<Participant | null> {
  const participants = await fetchAllParticipants();
  const normalized = nis.trim();
  return participants.find((p) => p.nis === normalized) ?? null;
}

/**
 * Cek apakah hasil seleksi = LULUS (case-insensitive, trim whitespace).
 */
export function isLulus(hasilSeleksi: string): boolean {
  return hasilSeleksi.trim().toLowerCase() === "lulus";
}

/**
 * Cek apakah hasil seleksi = TIDAK LULUS.
 */
export function isTidakLulus(hasilSeleksi: string): boolean {
  return hasilSeleksi.trim().toLowerCase() === "tidak lulus";
}
