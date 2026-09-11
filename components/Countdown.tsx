"use client";

/**
 * components/Countdown.tsx
 * Menampilkan countdown realtime ke tanggal pengumuman.
 */

import { useState, useEffect, useCallback } from "react";

interface Props {
  targetDate: string;
  onComplete: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

interface UnitBoxProps {
  value: string;
  label: string;
  accent?: boolean;
}

function UnitBox({ value, label, accent = false }: UnitBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-inner
          ${accent ? "bg-red-700 shadow-red-900/30" : "bg-gray-900 shadow-gray-900/30"}
        `}
        aria-label={`${value} ${label}`}
      >
        <span className="text-2xl md:text-3xl font-black text-white font-mono tracking-tight tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-[11px] text-gray-500 mt-2 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetDate, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  const tick = useCallback(() => {
    const t = calculateTimeLeft(targetDate);
    setTimeLeft(t);
    if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
      onComplete();
    }
  }, [targetDate, onComplete]);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-5">
        Pengumuman Dibuka Dalam
      </p>

      {/* Countdown boxes */}
      <div
        className="flex items-center gap-1.5 md:gap-3"
        role="timer"
        aria-live="polite"
        aria-label="Hitung mundur pengumuman"
      >
        <UnitBox value={pad(timeLeft.days)} label="Hari" />
        <span className="text-2xl font-bold text-gray-300 mb-5 select-none">:</span>
        <UnitBox value={pad(timeLeft.hours)} label="Jam" />
        <span className="text-2xl font-bold text-gray-300 mb-5 select-none">:</span>
        <UnitBox value={pad(timeLeft.minutes)} label="Menit" />
        <span className="text-2xl font-bold text-gray-300 mb-5 select-none">:</span>
        <UnitBox value={pad(timeLeft.seconds)} label="Detik" accent />
      </div>

      <p className="mt-6 text-sm text-gray-500 text-center leading-relaxed">
        Silakan kembali pada waktu yang telah ditentukan
        <br />
        untuk melihat hasil seleksi.
      </p>
    </div>
  );
}
