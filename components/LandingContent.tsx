"use client";

/**
 * components/LandingContent.tsx
 * Client component: menampilkan countdown atau CTA button berdasarkan waktu pengumuman.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import Countdown from "./Countdown";

const ANNOUNCEMENT_DATE =
  process.env.NEXT_PUBLIC_ANNOUNCEMENT_DATE || "2026-09-11T14:00:00+07:00";

export default function LandingContent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen]   = useState(false);

  useEffect(() => {
    setMounted(true);
    if (new Date() >= new Date(ANNOUNCEMENT_DATE)) {
      setIsOpen(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-10">
      {/* ── Hero title ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
          <Clock className="w-3.5 h-3.5" />
          Pengumuman Resmi
        </span>

        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Pengumuman Hasil Seleksi
        </h2>
        <p className="text-lg md:text-2xl font-bold text-red-700 mt-1">
          Calon Anggota Marching Band Gema Taruna
        </p>
        <p className="text-base md:text-lg font-semibold text-gray-600 mt-1">
          Angkatan XVI
        </p>
      </motion.div>

      {/* ── Announcement card ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card header bar */}
          <div className="bg-gray-900 py-3 px-6 text-center">
            <p className="text-white text-xs font-bold tracking-[0.25em] uppercase">
              Pengumuman Hasil Seleksi
            </p>
          </div>

          <div className="p-8 md:p-10 text-center">
            {/* Skeleton saat hydration */}
            {!mounted ? (
              <div className="h-36 flex items-center justify-center">
                <div className="w-7 h-7 border-[3px] border-red-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {isOpen ? (
                  /* ── Pengumuman sudah dibuka ───────────────── */
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg
                        className="w-9 h-9 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <p className="text-base font-semibold text-gray-700">
                      PENGUMUMAN HASIL SELEKSI
                    </p>
                    <p className="text-2xl font-extrabold text-green-600 mb-7">
                      TELAH DIBUKA
                    </p>

                    <Link
                      href="/login"
                      className="
                        inline-flex items-center justify-center gap-2 w-full md:w-auto
                        bg-red-700 hover:bg-red-800 active:bg-red-900
                        text-white font-bold text-base md:text-lg
                        px-8 py-4 rounded-xl shadow-lg shadow-red-200
                        transition-colors duration-150
                      "
                    >
                      LIHAT HASIL SELEKSI
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                ) : (
                  /* ── Countdown ─────────────────────────────── */
                  <motion.div
                    key="countdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Countdown
                      targetDate={ANNOUNCEMENT_DATE}
                      onComplete={() => setIsOpen(true)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Hint text ─────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 text-xs text-gray-400 text-center"
      >
        Siapkan <strong className="text-gray-500">NIS</strong> Anda untuk
        mengakses hasil seleksi.
      </motion.p>
    </div>
  );
}
