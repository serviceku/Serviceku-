# Serviceku - Website Promosi Jasa Service Elektronik & Pendingin

Website resmi dan katalog interaktif untuk promosi jasa service panggilan elektronik **Serviceku (Elektronik Terbaik - Spesialis Pendingin dan Mesin Elektronik)**. Dilengkapi fitur order langsung ke WhatsApp (+62 878-7441-7978) dan Dashboard Admin untuk mempublikasikan jasa serta foto baru secara permanen.

---

## 🌟 Fitur Utama

1. **Logo Resmi Serviceku**:
   - Dibuat dalam format SVG beresolusi tinggi sesuai desain resmi (Simbol kepingan salju pendingin, gerigi mesin, kunci inggris perbaikan, dan ombak air dinamis).

2. **Beranda & Katalog Jasa Modern**:
   - Kartu katalog modern dengan foto elektronik beresolusi tinggi.
   - Filter kategori cepat: **AC Pendingin**, **Kulkas & Refrigerator**, **Mesin Cuci**, **Showcase Minuman**, **Freezer Box**, dan **Dispenser**.
   - Kolom pencarian realtime (misal: "cuci ac", "freon", "modul", "kulkas").
   - Label promo, badge "Paling Laris", dan badge "Garansi 1 Bulan".
   - Prosedur pengerjaan & checklist garansi lengkap pada setiap jasa.

3. **Integrasi WhatsApp Langsung (+62 878-7441-7978)**:
   - Tombol **"Pesan WA"** dan **"Chat Langsung"** di setiap kartu jasa.
   - Modal booking lengkap: Pelanggan dapat memasukkan Nama, No. HP, Alamat, Rencana Kunjungan, dan Keluhan yang otomatis diformat menjadi pesan WhatsApp rapi.
   - Widget WhatsApp mengambang (Floating Chat) di pojok kanan bawah dengan status teknisi online.

4. **Slide Show Banner Infografis (Gradasi Dinamis)**:
   - Slider animasi otomatis dengan latar gradasi warna (Electric Blue, Cyan, Indigo, Amber, Emerald).
   - Teks promosi, highlight jasa, dan tombol pemesanan langsung ke WhatsApp.
   - Admin dapat menambah, mengubah, atau menghapus banner infografis kapan saja.

5. **Portal Akun User Admin (Login & Keamanan)**:
   - Tombol **Admin Login** di navigasi atas.
   - Form login custom username & password.
   - **Fitur icon mata** untuk melihat dan menyembunyikan kata sandi.
   - Kredensial default:
     - **Username**: `admin`
     - **Password**: `serviceku123`

6. **Dashboard Admin & Publikasi Permanen**:
   - **Kelola Jasa**: Tambah jasa baru, edit nama, ubah tarif harga, ubah deskripsi, atur masa garansi, dan kelola alamat layanan.
   - **Unggah Foto Langsung**: Dukungan upload foto dari perangkat (HP/Laptop) dengan pratinjau langsung (Live Preview) serta pilihan galeri foto elektronik siap pakai.
   - **Penyimpanan Permanen Multi-Perangkat**: Data tersimpan di server Express (`data/database.json`) sehingga perubahan yang dipublikasikan oleh admin dapat langsung dilihat oleh pengunjung dari perangkat lain (HP, tablet, laptop).
   - **Kelola Kontak & Workshop**: Atur nomor WhatsApp, alamat workshop di *Jl. by pass Binaria-bondan*, dan area jangkauan (*Indramayu, Cirebon, Majalengka*).

---

## 🚀 Panduan Push ke GitHub

Untuk mengunggah (push) proyek ini ke repositori GitHub Anda:

1. Buat repositori baru di [GitHub](https://github.com/new), misalnya dengan nama `serviceku-web`.
2. Jalankan perintah berikut di terminal:

```bash
# Inisialisasi git jika belum ada
git init

# Tambahkan seluruh file proyek
git add .

# Buat commit pertama
git commit -m "feat: inisialisasi website Serviceku dengan katalog, WhatsApp, dan admin"

# Ubah nama branch utama menjadi main
git branch -M main

# Hubungkan ke remote repositori GitHub Anda (ganti URL dengan link repositori Anda)
git remote add origin https://github.com/USERNAME_ANDA/serviceku-web.git

# Push ke GitHub
git push -u origin main
```

---

## 💻 Cara Menjalankan di Komputer Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server lokal
npm run dev

# 3. Buka di browser
# http://localhost:3000
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend / API**: Express.js + JSON Persistent Storage
- **Direct Messaging**: WhatsApp Click-to-Chat API
