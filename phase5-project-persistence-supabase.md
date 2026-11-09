# Phase 5 — Project Persistence with Supabase

## 1. Objective

Implementasikan sistem penyimpanan proyek agar pengguna dapat menyimpan, membuka kembali, mengedit, dan menghapus desain pakaian mereka.

Sistem harus mendukung dua jenis garment:
- T-Shirt
- V-Neck Jersey

Gunakan Supabase sebagai backend untuk Authentication, PostgreSQL Database, dan Storage.

Sebelum implementasi, audit arsitektur project saat ini dan gunakan kembali Zustand store, Fabric.js, serta struktur data desain yang sudah tersedia.

## 2. Authentication

Implementasikan Supabase Authentication.

Fitur:
- Register menggunakan email dan password.
- Login.
- Logout.
- Session persistence.
- Restore session ketika halaman dibuka kembali.
- Protected routes untuk halaman yang membutuhkan akun.
- Loading dan error states yang jelas.

Pengguna yang belum login tetap dapat menggunakan editor dalam mode guest jika memungkinkan.

Jangan menghilangkan fitur desain yang sudah tersedia hanya karena pengguna belum login.

## 3. Project Management

Buat halaman My Projects untuk mengelola desain pengguna.

Setiap project memiliki:
- Project ID.
- User ID.
- Project name.
- Garment type (T-Shirt atau Jersey).
- Garment base color.
- Design configuration.
- Thumbnail preview.
- Created timestamp.
- Updated timestamp.

Fitur:
- Create project.
- Save project.
- Open project.
- Rename project.
- Duplicate project.
- Delete project.
- Display project list.
- Search projects.
- Sort by latest updated.

Tampilkan empty state ketika pengguna belum memiliki proyek.

## 4. Design Data Persistence

Simpan seluruh informasi desain yang dibutuhkan untuk merekonstruksi editor.

Data minimal:
- Garment type.
- Fabric color.
- Selected surface.
- Artwork elements.
- Text elements.
- Layer ordering.
- Element position.
- Element scale.
- Element rotation.
- Element opacity.
- Font family.
- Font size.
- Font weight.
- Text alignment.
- Artwork source references.
- Canvas dimensions.

Pastikan setiap panel desain memiliki data independen.

Untuk Jersey, simpan enam surface:
- Front.
- Back.
- Left.
- Right.
- Left Shoulder.
- Right Shoulder.

Untuk T-Shirt, simpan desain Front dan Back sesuai implementasi yang sudah ada.

Gunakan format JSON terstruktur dan versioning agar perubahan struktur data di masa depan dapat dimigrasikan.

Jangan menyimpan temporary object, browser references, atau data yang tidak dapat direkonstruksi.

## 5. Supabase Database

Buat database schema yang sesuai.

Minimal tabel:

### profiles
- id.
- display_name.
- created_at.
- updated_at.

### projects
- id.
- user_id.
- name.
- garment_type.
- thumbnail_url.
- design_data (JSONB).
- created_at.
- updated_at.

Gunakan foreign key ke auth.users.

Tambahkan index untuk user_id dan updated_at jika diperlukan.

Terapkan Row Level Security (RLS):
- Pengguna hanya dapat membaca proyek miliknya.
- Pengguna hanya dapat membuat proyek dengan user_id miliknya sendiri.
- Pengguna hanya dapat memperbarui proyek miliknya.
- Pengguna hanya dapat menghapus proyek miliknya.

Jangan pernah mengekspos Supabase service role key di frontend.

## 6. Artwork Storage

Gunakan Supabase Storage untuk menyimpan artwork yang diunggah pengguna apabila diperlukan.

Persyaratan:
- Setiap pengguna memiliki namespace atau folder sendiri.
- Simpan referensi file dalam design_data.
- Validasi file type dan ukuran.
- Hindari mengunggah file yang sama berulang kali jika dapat dideteksi.
- Hapus file artwork yang tidak lagi digunakan dengan aman.
- Jangan menyimpan base64 image berukuran besar langsung di PostgreSQL jika file storage lebih sesuai.

Pastikan desain yang dibuka kembali dapat memuat artwork yang sebelumnya diunggah.

## 7. Save & Load Workflow

### Save
Ketika pengguna menyimpan desain:
1. Ambil state desain dari Zustand.
2. Serialize data desain.
3. Upload artwork yang diperlukan.
4. Simpan metadata dan design_data ke Supabase.
5. Simpan thumbnail preview.
6. Tampilkan konfirmasi berhasil atau error.

### Load
Ketika pengguna membuka project:
1. Ambil data project dari Supabase.
2. Validasi schema dan version.
3. Restore garment type.
4. Restore fabric color.
5. Restore seluruh surface.
6. Restore artwork dan typography.
7. Restore layer ordering.
8. Sinkronkan kembali Fabric.js canvas.
9. Tampilkan desain pada 3D viewer.

Pastikan desain yang dibuka memiliki tampilan yang sama dengan desain sebelum disimpan.

## 8. Autosave & Unsaved Changes

Implementasikan mekanisme penyimpanan yang aman.

- Sediakan tombol Save.
- Tampilkan indikator unsaved changes.
- Hindari request ke database pada setiap perubahan kecil.
- Jika autosave diterapkan, gunakan debounce.
- Tangani kegagalan jaringan.
- Jangan menghapus perubahan lokal ketika save gagal.
- Berikan peringatan ketika pengguna meninggalkan halaman dengan perubahan yang belum disimpan.

## 9. UI/UX

Buat halaman My Projects dengan desain modern dan konsisten dengan sistem desain aplikasi.

Setiap project card menampilkan:
- Thumbnail.
- Project name.
- Garment type.
- Last modified.
- Menu actions.

Sediakan:
- New Project.
- Open.
- Rename.
- Duplicate.
- Delete.
- Confirmation dialog untuk delete.

Pastikan responsif pada mobile, tablet, dan desktop.

Pertahankan Dark Mode dan Light Mode.

## 10. Architecture

Pisahkan tanggung jawab ke service/repository yang reusable.

Contoh struktur yang dapat disesuaikan dengan project:

- features/auth/
- features/projects/
- services/supabase/
- repositories/project/
- types/project/

Jangan menaruh seluruh query database langsung di komponen UI.

Gunakan environment variables untuk konfigurasi Supabase.

Sediakan `.env.example` tanpa secret asli.

Jangan mengubah arsitektur secara besar-besaran jika struktur yang sekarang sudah mendukung kebutuhan.

## 11. Testing

Uji skenario berikut:

### Authentication
- Register.
- Login.
- Logout.
- Session restoration.
- Invalid credentials.

### Project
- Create.
- Save.
- Load.
- Rename.
- Duplicate.
- Delete.
- Search.

### Design Persistence
- Simpan T-Shirt dengan artwork dan teks.
- Simpan Jersey dengan enam panel.
- Tutup dan buka kembali project.
- Pastikan seluruh artwork, posisi, ukuran, rotasi, warna, dan layer tetap sama.
- Pastikan 3D viewer menampilkan desain yang direstore.

### Security
- Uji RLS antar-user.
- Pastikan pengguna tidak bisa mengakses project pengguna lain.
- Pastikan service role key tidak masuk ke frontend.

### Regression
- T-Shirt Designer tetap berfungsi.
- Jersey Designer tetap berfungsi.
- Undo dan redo tetap berfungsi.
- Dark Mode dan Light Mode tetap berfungsi.

Jalankan:
- npx tsc -b
- npm run lint
- npm run build

## 12. Final Report

Laporkan:
1. Arsitektur Supabase yang digunakan.
2. Database schema.
3. RLS policies.
4. Authentication implementation.
5. Project CRUD.
6. Artwork storage.
7. Save/load workflow.
8. Autosave status.
9. Hasil pengujian.
10. Fitur yang belum selesai.

## Definition of Done

Pengguna dapat membuat desain T-Shirt atau Jersey, menyimpannya ke akun, meninggalkan aplikasi, login kembali, membuka project, dan mendapatkan kembali desain yang sama secara visual dan fungsional.