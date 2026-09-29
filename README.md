# Sistem Manajemen Karyawan Sederhana (SMKS) 👥

Proyek ini adalah aplikasi berbasis web sederhana yang dikembangkan secara eksklusif untuk memenuhi tugas sekolah (studi kasus operasional kantor). Aplikasi ini berfokus pada penerapan operasi CRUD dasar melalui dua modul utama: pengelolaan pengajuan cuti/izin dan perhitungan rekapitulasi gaji harian karyawan.

## 📌 Hak Akses (Role)

Sistem ini membedakan interaksi pengguna berdasarkan dua level otorisasi:

1. **Karyawan**: Dapat mengajukan permohonan cuti/izin dan melihat rincian pemotongan gaji milik sendiri.
2. **HRD (Admin)**: Dapat memvalidasi (menyetujui/menolak) pengajuan cuti dan melakukan penyesuaian komponen gaji seluruh karyawan.

## ⚙️ Fitur & Logika Bisnis (Sesuai Syarat Tugas)

### 1. Modul Kehadiran & Cuti

- **Pengajuan Cuti**: Karyawan dapat mengisi form tanggal mulai dan tanggal selesai untuk pengajuan izin atau cuti.
- **Perhitungan Hari Kerja Saja**: Sistem dirancang untuk menghitung total hari cuti dengan mengabaikan hari libur akhir pekan (Sabtu & Minggu). Pemotongan gaji hanya akan dikenakan pada hari kerja aktif (Senin - Jumat).
- **Validasi Syarat Dokumen**: Apabila total kalkulasi hari kerja yang diajukan lebih dari 3 hari, sistem akan mewajibkan karyawan melampirkan file dokumen "Surat Pernyataan Bertanggung Jawab".
- **Persetujuan HRD**: HRD memiliki akses untuk mengubah status pengajuan menjadi "Disetujui" atau "Ditolak", serta menambahkan catatan khusus pada form tersebut.

### 2. Modul Rekapitulasi Gaji

- **Basis Gaji Harian**: Gaji pokok karyawan dihitung dengan tarif harian tetap (Rp 227.272 / hari kerja).
- **Pemotongan Otomatis**: Total gaji kotor bulanan akan otomatis dipotong berdasarkan akumulasi hari cuti aktif yang telah disetujui oleh HRD.
- **Penyesuaian Manual (Khusus HRD)**: Sebelum finalisasi gaji, form CRUD memberikan fleksibilitas kepada HRD untuk:
  - Memodifikasi nominal gaji harian.
  - Menambahkan/mengurangi persentase tertentu.
  - Memasukkan nilai nominal khusus sebagai bonus atau potongan tambahan.
- **Tampilan Karyawan**: Karyawan hanya memiliki akses _Read-Only_ untuk melihat laporan akhir dari gaji mereka sendiri (privasi data antar karyawan terjaga).

## 🚀 Panduan Instalasi Lokal

1. _Clone_ repositori ini ke komputer Anda:

   ```bash
   git clone [https://github.com/aliefibnu/sistem-manajemen-karyawan-sederhana.git](https://github.com/aliefibnu/sistem-manajemen-karyawan-sederhana.git)
   ```

2. Impor struktur _database_ yang terdapat pada folder `database/` ke manajemen _database_ lokal Anda.
3. Sesuaikan koneksi _database_ pada file konfigurasi proyek.
4. Akses aplikasi melalui _localhost_ di _browser_ Anda.

## 🔐 Akun Pengujian

Gunakan data berikut untuk menguji _form login_:

- **HRD**: `hrd@kantor.local` | Password: `admin`
- **Karyawan**: `karyawan@kantor.local` | Password: `user123`

---

_Disclaimer: Proyek ini dibuat sepenuhnya sebagai tugas akademik untuk simulasi logika pemrograman tingkat sekolah. Tidak ada data perusahaan asli yang digunakan di dalam sistem ini._
