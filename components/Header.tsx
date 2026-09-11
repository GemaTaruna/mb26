/**
 * components/Header.tsx
 * Header website — merah putih, nama sekolah & satuan.
 */
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-800 text-white shadow-lg border-b border-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center gap-3 md:gap-4">
        <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 drop-shadow-md">
          <Image
            src="/logo.png"
            alt="Logo Taruna SMK Negeri 2 Sragen"
            width={64}
            height={64}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <div className="text-center">
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-blue-200">
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
