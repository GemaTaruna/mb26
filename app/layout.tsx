import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pengumuman Hasil Seleksi — Marching Band Gema Taruna",
  description:
    "Pengumuman Hasil Seleksi Calon Taruna Angkatan XVI — PASSUS Marching Band Gema Taruna, SMK Negeri 2 Sragen.",
  robots: "noindex, nofollow", // Jangan diindeks mesin pencari
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
