# LCI Database (SIM-LCI)

Sistem informasi berbasis web untuk mengelola basis data Life Cycle Inventory (LCI) dalam konteks Indonesia. Sistem ini menyimpan, mengklasifikasikan, dan menyajikan dataset proses beserta metadatanya secara seragam, dengan pemetaan taksonomi ISIC Rev.5.

Proyek ini dikembangkan dalam rangka kegiatan magang di BRIN. Tampilan dan struktur datanya mengacu pada TianGong LCDN, dengan cakupan yang sengaja dibuat jauh lebih kecil.

> Status: dalam pengembangan aktif (tahap MVP), belum ada rilis. Lihat bagian [Status Pengembangan](#status-pengembangan).

## Tujuan Sistem

1. Menyediakan satu tempat terpusat untuk data inventori daur hidup (LCI) yang selama ini tersebar dalam berkas terpisah.
2. Memastikan setiap dataset memiliki metadata yang seragam sehingga mudah dicari, dibandingkan, dan diverifikasi.
3. Mengklasifikasikan proses dengan taksonomi ISIC Rev.5 agar selaras dengan klasifikasi proses pada ekosistem TianGong.
4. Mendukung pertukaran data dalam format JSON-LD, baik untuk impor maupun ekspor.

## Fitur

### Cakupan MVP

Centang menandakan fitur yang sudah berfungsi di cabang utama.

* [ ] Registrasi dan login pengguna
* [ ] Dashboard
* [ ] Halaman per menu pada sidebar (Open Data dan My Data pada bilah atas)
* [ ] Menu Processes dengan pohon ISIC Rev.5 bersarang, tampil dan baca data
* [ ] Impor dataset dari berkas JSON-LD
* [ ] Input dataset secara manual melalui formulir
* [ ] Ekspor dataset dalam bentuk zip berisi folder berkas JSON
* [ ] Antarmuka dua bahasa (Indonesia dan Inggris)
* [ ] Pembatasan akses: tamu hanya melihat ringkasan (overview), detail dataset memerlukan login

## Teknologi

| Lapisan | Teknologi |
| :--- | :--- |
| Bahasa | TypeScript (frontend dan backend) |
| Frontend | Template Ant Design Pro (React, UmiJS) dengan penyesuaian |
| Basis data | PostgreSQL |
| Taksonomi | ISIC Rev.5 (bersumber dari openLCA) |
| Format data | JSON-LD |

## Struktur Repositori

> Sesuaikan dengan struktur folder yang sebenarnya.

```text
.
├── frontend/        Aplikasi antarmuka (Ant Design Pro)
├── backend/         API dan akses basis data
├── docs/            Dokumentasi proyek
│   └── ant-design-pro.md   README bawaan template Ant Design Pro
├── README.md
└── LICENSE
```

## Cara Menjalankan

### Prasyarat

* Node.js `<ISI: samakan dengan kolom engines pada package.json>`
* PostgreSQL `<ISI: versi yang dipakai>`
* Manajer paket `<ISI: npm, pnpm, atau yarn>`

### Langkah

1. Klon repositori.

```bash
git clone <URL_REPOSITORI>
cd <NAMA_FOLDER>
```

2. Siapkan basis data PostgreSQL, lalu buat basis data kosong untuk aplikasi.

```bash
createdb lci_database
```

3. Salin berkas konfigurasi lingkungan dan isi nilainya.

```bash
cp backend/.env.example backend/.env
```

Variabel yang perlu diisi (sesuaikan dengan `.env.example`):

```text
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/lci_database
PORT=<ISI>
```

4. Pasang dependensi dan jalankan migrasi basis data.

```bash
cd backend
npm install
npm run <ISI: perintah migrasi>
```

5. Jalankan backend.

```bash
npm run <ISI: perintah dev backend>
```

6. Pada terminal lain, jalankan frontend.

```bash
cd frontend
npm install
npm run <ISI: perintah dev frontend>
```

7. Buka alamat yang ditampilkan di terminal (umumnya `http://localhost:8000` untuk Ant Design Pro).

### Akun uji

Selama pengembangan, data awal memakai akun contoh fiktif. Akun ini hanya untuk lingkungan lokal dan tidak boleh dipakai di server nyata.

## Status Pengembangan

Pembaruan terakhir: 5 November 2026

| Area | Status |
| :--- | :--- |
| Analisis kebutuhan (wawancara dengan periset) | Selesai |
| Dokumen kebutuhan produk (PRD) | Draf 2 |
| Rancangan wireframe antarmuka | Selesai |
| Implementasi frontend | `<ISI: belum dimulai / berjalan / selesai>` |
| Implementasi backend dan basis data | `<ISI>` |
| Pengujian | `<ISI>` |
| Rilis | Belum ada |

## Dokumentasi

Dokumen berikut berada di folder `docs/` (masih dalam penyusunan):

* PRD: kebutuhan dan ruang lingkup produk
* ARCHITECTURE: arsitektur sistem
* DATA_MODEL: model data dan skema basis data
* TASKS: daftar tugas dan kemajuan
* DECISIONS: catatan keputusan teknis
* TESTING: strategi pengujian
* `ant-design-pro.md`: README bawaan template, disimpan sebagai arsip

## Acuan

* TianGong LCDN: acuan tampilan dan struktur data
* TIDAS (tidas.tiangong.earth): format data TianGong berbasis JSON dan JSON Schema
* openLCA: sumber taksonomi ISIC
* Ant Design Pro: template frontend

## Lisensi dan Atribusi

Lisensi proyek: `<ISI>`. Frontend dibangun di atas template Ant Design Pro yang berlisensi MIT, sehingga berkas lisensi dan pemberitahuan hak cipta dari template tersebut tetap dipertahankan.
