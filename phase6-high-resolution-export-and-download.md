# Phase 6 — High-Resolution Export & Download System

## 1. Objective

Implementasikan sistem export dan download agar pengguna dapat mengunduh hasil desain T-Shirt dan V-Neck Jersey.

Sistem harus mendukung export artwork 2D, mockup pakaian 3D, dan file texture untuk kebutuhan produksi.

Gunakan kembali seluruh komponen dan state yang sudah tersedia:
- Zustand.
- Fabric.js.
- T-Shirt 3D Model.
- V-Neck Jersey 3D Model.
- Six Jersey Design Surfaces.
- Supabase Project Persistence.

Jangan membangun ulang sistem editor.

## 2. Export Dashboard

Tambahkan fitur Export pada editor.

Buat modal atau panel export yang memungkinkan pengguna memilih:

- Export type.
- Garment type.
- Design surface.
- Resolution.
- Background.
- File format.

Tampilkan preview sebelum pengguna mengunduh file.

Sediakan loading state, progress indicator jika memungkinkan, serta error handling.

## 3. 2D Artwork Export

Implementasikan export artwork dari Fabric.js canvas.

Format:
- PNG dengan transparansi.
- JPEG dengan background yang dapat dipilih.

Resolution presets:
- 1024 × 1024.
- 2048 × 2048.
- 4096 × 4096.

Persyaratan:
- Pertahankan transparansi artwork PNG.
- Jangan menyertakan garis batas canvas atau editor guides.
- Pertahankan posisi, ukuran, rotasi, font, dan warna.
- Jangan mengubah proporsi artwork.
- Pastikan seluruh objek berada dalam batas export yang ditentukan.
- Gunakan kualitas render yang sesuai dengan resolusi pilihan.

Export harus mendukung seluruh surface yang tersedia.

T-Shirt:
- Front.
- Back.

Jersey:
- Front.
- Back.
- Left.
- Right.
- Left Shoulder.
- Right Shoulder.

Sediakan opsi:
- Export current surface.
- Export all surfaces.

Jika pengguna memilih semua surface, sediakan ZIP berisi file PNG terpisah dan nama file yang jelas.

## 4. 3D Mockup Export

Implementasikan export hasil render 3D menggunakan Three.js / React Three Fiber.

Format:
- PNG.
- JPEG.

Resolution presets:
- 1024 × 1024.
- 2048 × 2048.
- 4096 × 4096 jika perangkat mendukung.

Camera presets:
- Front.
- Back.
- Left.
- Right.
- Isometric.

Background:
- Transparent.
- White.
- Current studio background.

Persyaratan:
- Model harus menampilkan desain terbaru.
- Artwork harus sudah tersinkronisasi dengan texture.
- Warna kain harus sesuai dengan pilihan pengguna.
- Lighting dan shadow harus tetap terlihat baik.
- Hasil render tidak boleh terpotong.
- Jangan mengambil screenshot DOM editor sebagai pengganti render 3D.
- Jangan mengubah kamera interaktif pengguna secara permanen saat proses export.

Gunakan render target atau mekanisme rendering resolusi tinggi yang sesuai dengan arsitektur Three.js.

Periksa batas kemampuan GPU dan WebGL. Jika resolusi yang diminta tidak didukung, tampilkan pesan yang jelas dan tawarkan resolusi lebih rendah.

## 5. UV Texture / Production Export

Implementasikan export texture atlas berdasarkan UV mapping model 3D.

Tujuan:
Menghasilkan texture yang dapat digunakan sebagai bahan lanjutan dalam proses produksi atau pengeditan di software 3D.

Persyaratan:
- Gunakan UV mapping aktual dari model GLB.
- Integrasikan artwork dari masing-masing panel.
- Pertahankan posisi dan orientasi artwork.
- Pertahankan warna dasar kain.
- Hindari texture overlap yang tidak diinginkan.
- Jangan memasukkan artwork ke bagian mesh yang tidak dimaksudkan.

Penting:
Decal projection tidak otomatis menghasilkan UV texture yang siap produksi.

Jika sistem saat ini menggunakan Decal, implementasikan proses baking atau pemetaan ulang ke UV atlas yang benar sebelum mengklaim export texture berhasil.

Sediakan:
- Jersey UV texture.
- T-Shirt UV texture.
- PNG texture beresolusi tinggi.
- Informasi resolusi dan garment type.

Jangan mengarang UV layout atau menggunakan gambar mockup sebagai pengganti texture atlas.

## 6. Production Export Considerations

Sediakan struktur export yang dapat dikembangkan untuk kebutuhan vendor percetakan.

Pertimbangkan:
- Resolusi dan dimensi texture.
- Ukuran fisik desain.
- Bleed / safe area.
- Color profile.
- Format file yang diminta vendor.

Jangan mengklaim file sudah print-ready jika ukuran fisik, DPI efektif, bleed, dan color profile belum disesuaikan dengan spesifikasi vendor.

Jika spesifikasi produksi belum tersedia, tampilkan bahwa hasil export merupakan high-resolution design asset, bukan file produksi final.

## 7. Export File Naming

Gunakan nama file yang konsisten.

Contoh:
- `my-jersey-front.png`
- `my-jersey-back.png`
- `my-jersey-left-sleeve.png`
- `my-jersey-right-sleeve.png`
- `my-jersey-left-shoulder.png`
- `my-jersey-right-shoulder.png`
- `my-jersey-mockup-front.png`
- `my-jersey-mockup-back.png`
- `my-jersey-uv-texture.png`

Untuk T-Shirt:
- `my-tshirt-front.png`
- `my-tshirt-back.png`
- `my-tshirt-mockup.png`
- `my-tshirt-uv-texture.png`

Sanitize project name sebelum digunakan sebagai nama file.

## 8. Export Architecture

Pisahkan implementasi export ke service yang reusable.

Contoh struktur:

- features/export/
  - components/
  - services/
  - types/
  - utils/

Pisahkan tanggung jawab:
- Canvas export.
- 3D render export.
- UV texture baking.
- ZIP generation.
- File download.

Jangan menaruh seluruh logic export dalam satu React component.

Pastikan proses export tidak mengganggu editor, Zustand state, atau project yang tersimpan.

## 9. UI/UX

Buat pengalaman export yang konsisten dengan desain aplikasi.

Sediakan:
- Export button pada editor.
- Export modal.
- Export type selector.
- Resolution selector.
- Background selector.
- Preview.
- Download button.
- Success notification.
- Error notification.

Pertahankan:
- Dark Mode.
- Light Mode.
- Responsive layout.
- Existing design system.

## 10. Testing

### 2D Export
- PNG transparan berhasil.
- JPEG memiliki background sesuai pilihan.
- Resolusi sesuai pilihan.
- Seluruh artwork terlihat.
- Tidak ada editor guides.

### 3D Export
- Front dan Back benar.
- Left dan Right benar.
- Isometric benar.
- Artwork dan warna kain sesuai desain terbaru.
- Background transparan bekerja.
- Tidak ada clipping.

### UV Export
- UV layout sesuai model sebenarnya.
- Artwork tidak terbalik.
- Artwork tidak bergeser ke panel lain.
- Texture dapat dibuka kembali dalam software 3D.

### Regression
- T-Shirt Designer tetap berjalan.
- Jersey Designer tetap berjalan.
- Save dan Load tetap berjalan.
- Undo dan Redo tetap berjalan.
- Dark Mode dan Light Mode tetap berjalan.

Jalankan:
- npx tsc -b
- npm run lint
- npm run build

## 11. Final Report

Laporkan:
1. Jenis export yang berhasil dibuat.
2. Format file yang didukung.
3. Pilihan resolusi.
4. Status transparansi PNG.
5. Status 3D mockup rendering.
6. Status UV texture baking.
7. Hasil pengujian setiap garment.
8. Keterbatasan GPU atau browser.
9. Apakah file sudah memenuhi spesifikasi vendor produksi.
10. Fitur yang masih membutuhkan pengembangan.

## Definition of Done

Pengguna dapat membuat desain, menyimpan proyek, lalu mengunduh artwork 2D, mockup 3D, dan UV texture sesuai kemampuan model yang tersedia.

Semua hasil export harus berasal dari desain aktual pengguna, bukan gambar dummy atau mockup statis.