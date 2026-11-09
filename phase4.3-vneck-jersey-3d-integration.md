# Phase 4.3 — V-Neck Jersey 3D Integration

## 1. Objective

Implementasikan model 3D jersey menggunakan desain blank V-neck short-sleeve sports shirt sebagai pengganti kebutuhan model jersey olahraga yang lebih kompleks.

Model harus memiliki tampilan seperti jersey olahraga profesional, dengan prioritas desain V-neck raglan.

Tujuan utamanya adalah mengintegrasikan model 3D V-neck ke dalam Virtual Clothing Designer sehingga pengguna dapat melihat hasil desain mereka secara langsung pada pakaian 3D.

Model ini akan menjadi dasar untuk fitur Jersey Customizer yang sudah memiliki enam area desain 2D.

## 2. Design Direction

Gunakan karakteristik model berikut:

- V-neck collar.
- Short sleeves.
- Sportswear / athletic fit.
- Raglan sleeves jika tersedia.
- Tampilan polos tanpa logo, sponsor, nomor, atau motif bawaan.
- Warna dasar putih atau abu-abu netral.
- Proporsi pakaian realistis.
- Mesh bersih dan tidak memiliki bagian yang rusak.
- UV mapping yang mendukung custom artwork.

Model harus terlihat seperti jersey olahraga, bukan kaos kasual dengan kerah bulat.

Prioritaskan model 3D yang sudah tersedia dan memiliki lisensi yang mengizinkan penggunaan dalam proyek ini.

## 3. Model Asset Requirements

Lokasi model:

`public/models/jersey.glb`

Persyaratan teknis:

- Format GLB.
- Mesh dan material valid.
- UV mapping tersedia.
- Normal dan tangent tidak bermasalah.
- Material kompatibel dengan Three.js PBR.
- Orientasi model benar.
- Origin dan skala model sesuai dengan scene.
- Model dapat dirotasi menggunakan OrbitControls.
- Tidak memiliki dependency eksternal yang hilang.

Jika model memiliki beberapa mesh, identifikasi bagian body, sleeves, collar, dan komponen lainnya.

Jangan menganggap model memenuhi persyaratan hanya karena file GLB berhasil dimuat.

## 4. Six Design Surfaces

Pertahankan enam area desain yang sudah tersedia:

### Front Body
Untuk logo klub, sponsor, motif, dan artwork bagian depan.

### Back Body
Untuk nama pemain, nomor punggung, logo, dan artwork belakang.

### Left Sleeve
Untuk motif atau logo lengan kiri.

### Right Sleeve
Untuk motif atau logo lengan kanan.

### Left Shoulder
Untuk motif bahu kiri jika area tersebut dapat dipetakan secara terpisah.

### Right Shoulder
Untuk motif bahu kanan jika area tersebut dapat dipetakan secara terpisah.

Periksa UV layout model yang sebenarnya sebelum menentukan cara integrasi setiap panel.

Jangan menggunakan koordinat Decal yang ditebak tanpa melakukan inspeksi terhadap geometri dan UV model.

Jika shoulder dan sleeve berada pada satu UV island, dokumentasikan kondisi tersebut dan tentukan pemetaan yang paling akurat.

## 5. 3D Artwork Integration

Hubungkan sistem Fabric.js yang sudah tersedia dengan model 3D.

Ketika pengguna:

- Mengunggah gambar.
- Menambahkan teks.
- Mengubah ukuran artwork.
- Memutar artwork.
- Mengubah posisi artwork.
- Menghapus atau menduplikasi layer.
- Berpindah antar-panel.

Perubahan harus tersinkronisasi dengan state desain dan ditampilkan pada permukaan model 3D yang sesuai.

Persyaratan:

- Artwork tidak boleh muncul terbalik.
- Artwork tidak boleh menembus permukaan pakaian.
- Artwork tidak boleh berpindah ke panel lain.
- Perubahan desain tidak boleh menghilangkan warna dasar kain.
- Setiap panel harus memiliki state independen.
- Undo dan redo harus tetap bekerja.
- Update preview 3D harus responsif.

Gunakan UV texture mapping apabila lebih sesuai dengan struktur UV model. Gunakan Decal projection hanya jika cocok dengan geometri dan hasil visualnya benar.

## 6. Garment Color Customization

Pertahankan fitur perubahan warna kain.

Pengguna harus bisa:

- Memilih preset warna.
- Memasukkan HEX color.
- Menggunakan color picker.
- Reset warna ke default.

Perubahan warna hanya memengaruhi material kain, bukan warna artwork, logo, maupun teks.

Jika model memiliki beberapa material untuk body, sleeves, dan collar, implementasikan pengaturan warna secara konsisten.

## 7. Viewer Experience

Integrasikan model ke `JerseyViewer3D.tsx`.

Pertahankan:

- 360-degree rotation.
- OrbitControls.
- Camera presets.
- Auto-rotate.
- Lighting dan shadow.
- Responsive viewport.
- Dark Mode dan Light Mode.

Pastikan model terlihat proporsional dan berada di tengah viewport.

Jika model gagal dimuat, tampilkan empty state dan error handling yang sudah dibuat pada Phase 4.2.

## 8. Architecture & Existing Features

Sebelum mengubah kode, audit implementasi yang sudah ada.

Prioritaskan reuse komponen dan service yang tersedia.

Jangan membuat ulang:

- Fabric.js canvas.
- Artwork uploader.
- Text editor.
- Layer manager.
- Zustand store.
- Theme service.
- Error handling.

Jangan merusak T-Shirt Designer yang sudah berjalan.

Pisahkan state Jersey dan T-Shirt.

## 9. Asset Licensing

Jika mengambil model dari sumber eksternal:

- Periksa lisensi penggunaan.
- Pastikan penggunaan dalam aplikasi dan modifikasi diperbolehkan.
- Catat sumber model.
- Catat nama pembuat dan lisensi.
- Jangan menggunakan asset berbayar atau berlisensi terbatas tanpa izin.
- Simpan dokumentasi atribusi jika diwajibkan.

Jangan mengklaim asset bebas digunakan tanpa memeriksa lisensinya.

## 10. Validation & Testing

Lakukan pengujian berikut:

### Model
- GLB berhasil dimuat.
- Bentuk V-neck terlihat jelas.
- Model tidak memiliki material atau tekstur yang hilang.
- Model dapat diputar 360 derajat.

### Artwork
- Artwork Front terlihat pada bagian depan.
- Artwork Back terlihat pada bagian belakang.
- Artwork Left dan Right berada pada lengan yang benar.
- Artwork Shoulder berada pada area yang benar jika didukung UV model.
- Artwork tidak terbalik atau terdistorsi secara berlebihan.

### Color
- Warna kain dapat berubah.
- Artwork mempertahankan warna aslinya.

### Regression
- T-Shirt Designer tetap berfungsi.
- Jersey 2D Designer tetap berfungsi.
- Undo dan redo tetap berjalan.
- Dark Mode dan Light Mode tetap berjalan.
- Responsive layout tidak rusak.

Jalankan:

`npx tsc -b`

`npm run lint`

`npm run build`

## 11. Final Report

Berikan laporan mengenai:

1. Sumber model V-neck yang digunakan.
2. Lisensi model.
3. Struktur mesh dan material.
4. Hasil pemeriksaan UV mapping.
5. Status integrasi keenam panel.
6. Status sinkronisasi Fabric.js ke 3D.
7. Status garment color customization.
8. Hasil testing.
9. Fitur yang belum berhasil diintegrasikan.

## Important Rules

- Jangan menggunakan model T-shirt round-neck sebagai pengganti V-neck.
- Jangan menggunakan mockup gambar 2D sebagai model 3D.
- Jangan membuat klaim bahwa enam panel sudah terintegrasi jika belum diuji.
- Jangan menebak koordinat UV atau Decal.
- Jangan merusak fitur yang sudah berjalan.
- Jika tidak menemukan model yang sesuai, laporkan kendalanya dan jangan mengarang asset.

**Definition of Done:** Pengguna dapat memilih Jersey, melihat model V-neck 3D yang sebenarnya, memutar model, mengubah warna kain, dan melihat artwork pada area pakaian yang sesuai dengan panel desain.