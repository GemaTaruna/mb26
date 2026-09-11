/**
 * lib/session.ts
 * Konfigurasi iron-session untuk autentikasi peserta.
 * Session disimpan sebagai encrypted cookie — aman, tidak perlu database.
 */

import { type SessionOptions } from "iron-session";

export interface SessionData {
  nis?: string;
  isLoggedIn?: boolean;
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "mb-gema-taruna-smk-negeri-2-sragen-2026-session-secret-key-aman",
  cookieName: "mb_gema_taruna_session",
  cookieOptions: {
    secure:   process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge:   60 * 60 * 8, // 8 jam
  },
};
