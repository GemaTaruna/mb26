"use client";

/**
 * components/ResultDisplay.tsx
 * Menampilkan hasil seleksi peserta — animasi fade-in, status card besar,
 * keterangan (opsional), tombol sertifikat (opsional), tombol logout.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  FileText,
  LogOut,
  User,
  Music,
  GraduationCap,
  Hash,
  BookOpen,
} from "lucide-react";
import type { Participant } from "@/lib/sheets";

interface Props {
  participant: Participant;
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function ResultDisplay({ participant }: Props) {
  const router       = useRouter();
  const [exiting, setExiting] = useState(false);

  const status = normalize(participant.hasilSeleksi);
  const isLulus      = status === "lulus";
  const isTidakLulus = status === "tidak lulus";

  async function handleLogout() {
    setExiting(true);
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  /* ── animation variants ─────────────────────────────────── */
  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Section title ───────────────────────────────────── */}
      <motion.div variants={itemVariants} className="text-center pt-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">
          Pengumuman Hasil Seleksi
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
          Calon Taruna Angkatan XVI
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Selamat datang,{" "}
          <strong className="text-gray-900">{participant.nama}</strong>
        </p>
      </motion.div>

      {/* ── Identity card ───────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        <h3 className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          <User className="w-3.5 h-3.5" aria-hidden="true" />
          Data Peserta
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<User className="w-3.5 h-3.5" />}
            label="Nama Lengkap"
            value={participant.nama}
          />
          <InfoRow
            icon={<Hash className="w-3.5 h-3.5" />}
            label="NIS"
            value={participant.nis}
            mono
          />
          <InfoRow
            icon={<GraduationCap className="w-3.5 h-3.5" />}
            label="Kelas"
            value={participant.kelas}
          />
          <InfoRow
            icon={<Music className="w-3.5 h-3.5" />}
            label="Pilihan Alat"
            value={participant.alat}
          />
        </div>
      </motion.div>

      {/* ══ STATUS CARD ══════════════════════════════════════════ */}
      <motion.div variants={itemVariants}>
        {isLulus ? (
          /* ── LULUS ─────────────────────────────────────────── */
          <div
            className="
              bg-blue-50 border-2 border-blue-500 rounded-2xl
              p-8 md:p-10 text-center shadow-sm
            "
            role="status"
            aria-label="Status kelulusan: LULUS"
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 250, damping: 18 }}
              className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle className="w-11 h-11 text-blue-600" strokeWidth={2} aria-hidden="true" />
            </motion.div>

            <div className="inline-flex items-center gap-2 bg-blue-600 text-white font-black text-2xl md:text-3xl px-6 py-2 rounded-xl mb-4 tracking-wide">
              <span aria-hidden="true">✓</span>
              LULUS
            </div>

            <p className="text-blue-900 font-extrabold text-xl mt-2">
              SELAMAT!
            </p>
            <p className="text-blue-800 text-base md:text-lg mt-2 leading-relaxed">
              Anda dinyatakan{" "}
              <strong className="underline underline-offset-2">LULUS</strong>{" "}
              dalam seleksi calon anggota
              <br className="hidden sm:block" />
              Marching Band Gema Taruna Angkatan XVI.
            </p>
          </div>
        ) : isTidakLulus ? (
          /* ── TIDAK LULUS ──────────────────────────────────── */
          <div
            className="
              bg-red-50 border-2 border-red-500 rounded-2xl
              p-8 md:p-10 text-center shadow-sm
            "
            role="status"
            aria-label="Status kelulusan: TIDAK LULUS"
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 250, damping: 18 }}
              className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <XCircle className="w-11 h-11 text-red-600" strokeWidth={2} aria-hidden="true" />
            </motion.div>

            <div className="inline-flex items-center gap-2 bg-red-600 text-white font-black text-2xl md:text-3xl px-6 py-2 rounded-xl mb-4 tracking-wide">
              <span aria-hidden="true">!</span>
              TIDAK LULUS
            </div>

            <p className="text-red-900 font-extrabold text-xl mt-2">
              Terima kasih
            </p>
            <p className="text-red-800 text-base md:text-lg mt-2 leading-relaxed">
              Terima kasih telah mengikuti proses seleksi.
              <br />
              <strong>Tetap semangat dan jangan berhenti berkembang.</strong>
            </p>
          </div>
        ) : (
          /* ── Status tidak dikenal ───────────────────────── */
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-gray-500 font-medium">
              Status seleksi belum tersedia.
            </p>
          </div>
        )}
      </motion.div>

      {/* ── Keterangan (opsional) ───────────────────────────── */}
      {participant.keterangan && participant.keterangan.trim() !== "" && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            Keterangan
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {participant.keterangan}
          </p>
        </motion.div>
      )}

      {/* ── Sertifikat (opsional) ───────────────────────────── */}
      {participant.linkSertifikat && participant.linkSertifikat.trim() !== "" && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            Sertifikat
          </h3>
          <a
            href={participant.linkSertifikat}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full flex items-center justify-center gap-2
              bg-gray-900 hover:bg-gray-700 active:bg-gray-800
              text-white font-bold text-sm md:text-base
              py-3.5 px-6 rounded-xl
              transition-colors duration-150 shadow-sm
            "
          >
            <FileText className="w-5 h-5" aria-hidden="true" />
            DOWNLOAD SERTIFIKAT
          </a>
        </motion.div>
      )}

      {/* ── Logout ──────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="text-center pb-6">
        <button
          onClick={handleLogout}
          disabled={exiting}
          className="
            inline-flex items-center gap-2
            text-gray-400 hover:text-gray-600
            text-sm font-medium
            transition-colors duration-150
            disabled:opacity-50
          "
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          {exiting ? "Keluar..." : "Keluar"}
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Helper: InfoRow ────────────────────────────────────────── */
function InfoRow({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-1 text-xs text-gray-400 mb-0.5">
        {icon} {label}
      </p>
      <p
        className={`font-semibold text-gray-900 text-sm md:text-base ${mono ? "font-mono" : ""}`}
      >
        {value || "—"}
      </p>
    </div>
  );
}
