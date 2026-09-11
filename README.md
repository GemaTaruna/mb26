# Website Pengumuman Hasil Seleksi
## PASSUS Marching Band Gema Taruna — SMK Negeri 2 Sragen

Portal resmi pengumuman hasil seleksi calon anggota **Marching Band Gema Taruna Angkatan XVI**.

---

## ⚙️ Konfigurasi Cepat

### 1. Jadikan Google Spreadsheet Publik

1. Buka Google Sheets Anda
2. Klik tombol **Share** (kanan atas)
3. Ubah ke **"Anyone with the link"** → **Viewer**
4. Klik **Done**

### 2. Edit `.env.local`

```env
NEXT_PUBLIC_SHEET_ID=1bP2El87Ak4PzPIfDOgZE-n9oIIx4skmxDI0xr5ZTYCY
NEXT_PUBLIC_ANNOUNCEMENT_DATE=2026-09-11T12:00:00+07:00
SESSION_SECRET=ganti-dengan-string-random-panjang-minimal-32-karakter
```

**Cara ganti tanggal pengumuman:** ubah `NEXT_PUBLIC_ANNOUNCEMENT_DATE` ke format:
```
YYYY-MM-DDTHH:MM:SS+07:00
```
Contoh: `2026-09-15T08:00:00+07:00` = 15 September 2026, pukul 08.00 WIB

### 3. Jalankan Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploy ke Vercel

### Langkah 1: Upload ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/mb-gema-taruna.git
git push -u origin main
```

### Langkah 2: Import ke Vercel

1. Buka [vercel.com](https://vercel.com) → login
2. Klik **Add New → Project**
3. Pilih repository GitHub Anda
4. Klik **Deploy**

### Langkah 3: Set Environment Variables di Vercel

Di dashboard project Vercel → **Settings → Environment Variables**, tambahkan:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SHEET_ID` | ID spreadsheet Google Anda |
| `NEXT_PUBLIC_ANNOUNCEMENT_DATE` | `2026-09-11T12:00:00+07:00` |
| `SESSION_SECRET` | string random panjang (generate di bawah) |

**Generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Langkah 4: Redeploy

Setelah tambah env variables → klik **Redeploy**.

---

## 🔧 Ubah Tanggal Pengumuman

**Untuk deployment di Vercel:**
1. Buka Vercel dashboard → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_ANNOUNCEMENT_DATE`
3. Klik **Save** → **Redeploy**

**Untuk lokal:**
Edit `.env.local` lalu restart dev server.

---

## 📋 Struktur Spreadsheet

| Kolom | Header | Keterangan |
|-------|--------|------------|
| A | NO | Nomor urut |
| B | NIS | **Nomor Induk Siswa** (digunakan untuk login) |
| C | NAMA | Nama lengkap peserta |
| D | ALAT | Pilihan alat |
| E | KELAS | Kelas peserta |
| F | HASIL SELEKSI | `LULUS` atau `TIDAK LULUS` |
| G | KETERANGAN | Keterangan tambahan (opsional) |
| H | LINK_SERTIFIKAT | URL PDF sertifikat (opsional) |
| I | STATUS_PDF | Status PDF (referensi admin) |

**Nilai HASIL SELEKSI** yang diterima (case-insensitive):
- `LULUS` → ditampilkan dengan warna **biru**
- `TIDAK LULUS` → ditampilkan dengan warna **merah**

---

## 🗂️ Struktur Proyek

```
mb-gema-taruna/
├── app/
│   ├── page.tsx              ← Landing page + countdown
│   ├── login/page.tsx        ← Form login NIS
│   ├── hasil/page.tsx        ← Halaman hasil (protected)
│   └── api/
│       ├── login/route.ts    ← API: validasi NIS → set session
│       ├── hasil/route.ts    ← API: ambil data peserta
│       └── logout/route.ts   ← API: hapus session
├── lib/
│   ├── sheets.ts             ← Google Sheets CSV fetcher & parser
│   └── session.ts            ← iron-session config
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Countdown.tsx
│   ├── LandingContent.tsx
│   ├── LoginForm.tsx
│   └── ResultDisplay.tsx
├── .env.local                ← Konfigurasi lokal (jangan di-commit!)
└── .env.example              ← Template konfigurasi
```

---

## 🔒 Keamanan

- Data peserta hanya dapat diakses setelah login dengan NIS yang valid
- Setiap peserta hanya dapat melihat datanya sendiri
- Session menggunakan encrypted cookie (iron-session) — berlaku 8 jam
- API tidak pernah mengembalikan data peserta lain
- Pesan error tidak mengungkapkan apakah NIS terdaftar atau tidak

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animasi:** Framer Motion
- **Icons:** Lucide React
- **Auth:** iron-session (encrypted cookie)
- **Data:** Google Sheets Public CSV Export
- **Deploy:** Vercel
