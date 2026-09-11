/**
 * components/Header.tsx
 * Header website — merah putih, nama sekolah & satuan.
 */
export default function Header() {
  return (
    <header className="bg-red-700 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center gap-4">
        {/* Placeholder logo — ganti dengan <Image> jika ada file logo */}
        <div className="w-14 h-14 md:w-16 md:h-16 bg-white/15 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0">
          <span className="text-[9px] text-white/70 font-bold text-center leading-tight">
            LOGO
          </span>
        </div>

        <div className="text-center">
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-red-200">
            Batalyon Taruna &mdash; SMK Negeri 2 Sragen
          </p>
          <h1 className="text-base md:text-xl font-extrabold tracking-wide leading-tight mt-0.5">
            PASSUS Marching Band Gema Taruna
          </h1>
        </div>
      </div>
    </header>
  );
}
