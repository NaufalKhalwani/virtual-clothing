# Phase 4.2 — Jersey 3D Asset & Error Handling

## Objective

Perbaiki error ketika pengguna memilih menu Jersey:

`Could not load /models/jersey.glb: Unexpected token '<', '<!doctype '... is not valid JSON`

Penyebab utamanya adalah aplikasi mencoba memuat `jersey.glb` yang belum tersedia. Vite kemudian mengembalikan HTML fallback, sehingga Three.js gagal membaca file tersebut sebagai model 3D.

## Implementation Requirements

### 1. Fix Jersey Model Loading

Audit `JerseyViewer3D.tsx`, `JerseyModel.tsx`, dan seluruh proses pemuatan model Jersey.

- Pastikan aplikasi memeriksa ketersediaan dan validitas file `public/models/jersey.glb` sebelum menjalankan `useGLTF`.
- Jangan hanya mengandalkan HTTP status 200 karena Vite dapat mengembalikan `index.html` sebagai fallback.
- Validasi format file GLB menggunakan magic header `glTF`.
- Pisahkan proses validasi asset dan komponen pemuatan model agar `useGLTF` tidak dijalankan sebelum asset dinyatakan valid.

### 2. Graceful Error Handling

Jika model tidak tersedia, rusak, atau gagal dimuat:

- Jangan biarkan aplikasi mengalami `Unexpected Application Error`.
- Tampilkan empty state yang profesional di area 3D viewer.
- Berikan informasi bahwa model 3D Jersey belum tersedia.
- Sediakan tampilan loading ketika model sedang diperiksa atau dimuat.
- Tambahkan Error Boundary untuk menangani kegagalan pemuatan model.

Jangan mengganti model Jersey dengan model T-shirt yang sudah ada. Jangan membuat klaim bahwa model 3D Jersey tersedia jika file aslinya belum ada.

### 3. Preserve Existing Features

Walaupun model 3D belum tersedia, pengguna harus tetap bisa menggunakan fitur 2D Jersey Designer:

- Front
- Back
- Left
- Right
- Left Shoulder
- Right Shoulder
- Upload artwork
- Text editor
- Layer management
- Resize, rotate, dan position artwork
- Undo dan redo
- Independent design state untuk setiap panel

Pastikan perubahan tidak merusak fitur T-shirt Designer, Dark Mode, maupun Light Mode.

### 4. Jersey 3D Asset Preparation

Audit kebutuhan model 3D Jersey yang sebenarnya.

Model harus berupa jersey olahraga, bukan T-shirt biasa. Model idealnya memiliki UV mapping yang memungkinkan artwork ditempatkan secara akurat pada enam area desain.

Jika belum ada asset yang valid, jangan membuat model palsu atau menggunakan model T-shirt sebagai pengganti. Dokumentasikan spesifikasi model yang dibutuhkan dan lokasi penempatan file:

`public/models/jersey.glb`

Jangan mengklaim integrasi 3D selesai sebelum model asli berhasil dimuat dan seluruh area desain berhasil diverifikasi secara visual.

## Testing & Validation

Setelah implementasi:

- Jalankan TypeScript check.
- Jalankan ESLint.
- Jalankan production build.
- Buka halaman Jersey ketika `jersey.glb` tidak tersedia.
- Pastikan tidak ada runtime crash.
- Pastikan seluruh fitur 2D Jersey tetap berfungsi.
- Pastikan T-shirt Designer tidak mengalami regresi.
- Jika model tersedia, uji rotasi 360 derajat dan penempatan artwork pada setiap panel.

## Final Report

Laporkan:
1. Penyebab error.
2. File yang dibuat atau dimodifikasi.
3. Perbaikan yang diterapkan.
4. Status enam panel 2D.
5. Status integrasi model 3D Jersey.
6. Hasil TypeScript, ESLint, dan production build.
7. Fitur yang masih membutuhkan asset atau pekerjaan lanjutan.

Jangan menyatakan semua fitur selesai jika masih ada bagian yang belum benar-benar diuji.