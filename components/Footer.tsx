/**
 * components/Footer.tsx
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center space-y-1">
        <p className="font-bold text-sm">PASSUS Marching Band Gema Taruna</p>
        <p className="text-gray-400 text-sm">SMK Negeri 2 Sragen</p>
        <p className="text-gray-500 text-xs mt-2">
          Pengumuman Hasil Seleksi Calon Taruna Angkatan XVI
        </p>
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-gray-600 text-xs">
            &copy; {year} PASSUS Marching Band Gema Taruna &mdash; SMK Negeri 2
            Sragen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
