"use client";

/**
 * components/LoginForm.tsx
 * Form login peserta — input NIS, validasi via API, redirect ke /hasil.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, Loader2, User } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [nis,     setNis]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nis.trim()) {
      setError("Mohon masukkan NIS Anda.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ nis: nis.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/hasil");
        router.refresh();
      } else {
        setError(
          data.message ||
            "Data yang Anda masukkan tidak ditemukan. Silakan periksa kembali NIS Anda."
        );
      }
    } catch {
      setError(
        "Terjadi gangguan saat mengambil data. Silakan coba beberapa saat lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div className="bg-red-700 py-7 px-6 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-white font-bold text-xl">Login Peserta</h2>
          <p className="text-red-200 text-sm mt-0.5">
            Pengumuman Hasil Seleksi Angkatan XVI
          </p>
        </div>

        {/* Form body */}
        <div className="p-6 md:p-8">
          <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">
            Masukkan <strong className="text-gray-800">NIS</strong> Anda untuk
            melihat hasil seleksi calon anggota Marching Band Gema Taruna
            Angkatan XVI.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* NIS field */}
            <div>
              <label
                htmlFor="nis"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                NIS (Nomor Induk Siswa)
              </label>
              <input
                id="nis"
                type="text"
                inputMode="numeric"
                value={nis}
                onChange={(e) => {
                  setNis(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Masukkan NIS Anda"
                disabled={loading}
                autoComplete="off"
                autoFocus
                aria-describedby={error ? "nis-error" : undefined}
                aria-invalid={!!error}
                className="
                  w-full px-4 py-3.5 rounded-xl border text-base text-gray-900
                  outline-none transition-all duration-150
                  border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100
                  disabled:bg-gray-50 disabled:text-gray-400
                "
              />
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                id="nis-error"
                role="alert"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3.5"
              >
                <AlertCircle
                  className="w-4 h-4 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !nis.trim()}
              className="
                w-full flex items-center justify-center gap-2
                bg-red-700 hover:bg-red-800 active:bg-red-900
                disabled:bg-gray-300 disabled:cursor-not-allowed
                text-white font-bold text-base
                py-4 px-6 rounded-xl
                transition-colors duration-150
                shadow-md shadow-red-200
              "
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  <span>Memeriksa data...</span>
                </>
              ) : (
                "LIHAT HASIL"
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
