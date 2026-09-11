import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Pengumuman Hasil Seleksi — Marching Band Gema Taruna",
  description:
    "Pengumuman Hasil Seleksi Calon Taruna Angkatan XVI — PASSUS Marching Band Gema Taruna, SMK Negeri 2 Sragen.",
  robots: "noindex, nofollow", // Jangan diindeks mesin pencari
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
