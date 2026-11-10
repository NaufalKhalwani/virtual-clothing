# PHASE 8 — Advanced Jersey Template Customization

**Project:** Virtual Clothing Designer  
**Project Root:** `D:\fullstack\virtual_desgin`

## 1. Objective

Mengembangkan fitur Jersey Customizer menjadi sistem desain jersey berbasis template yang lebih fleksibel dan mudah digunakan.

Pengguna dapat memilih template jersey yang sudah tersedia, mengatur kombinasi warna, mengedit teks, menambahkan garis horizontal maupun vertikal, serta memilih motif khusus untuk lengan kanan dan kiri.

Seluruh perubahan harus terlihat secara konsisten pada 2D editor, 3D preview, project persistence, dan hasil export.

Gunakan gambar referensi jersey yang diberikan sebagai inspirasi variasi desain, bukan sebagai gambar yang ditempel langsung pada model jersey.

## 2. Jersey Template Selection

Tambahkan fitur pemilihan template jersey.

Sediakan beberapa variasi desain awal, misalnya:

- Classic Horizontal Stripes.
- Vertical Stripes.
- Diagonal Stripes.
- Two-Tone Jersey.
- Minimalist Jersey.
- Modern Geometric Jersey.

Setiap template harus memiliki karakter desain yang berbeda, termasuk komposisi warna, bentuk garis, area desain, dan elemen visual.

Buat sistem template yang reusable dan data-driven agar template baru dapat ditambahkan tanpa harus membuat ulang seluruh komponen editor.

Setiap template harus menyediakan thumbnail preview dan dapat diterapkan pada model jersey yang sama.

Ketika pengguna memilih template, desain diterapkan pada jersey dan dapat dikustomisasi lebih lanjut.

Pastikan pemilihan template tidak menghilangkan perubahan yang sudah dibuat tanpa konfirmasi apabila desain sebelumnya belum disimpan.

## 3. Color Customization

Tambahkan pengaturan kombinasi warna untuk setiap template.

Pengguna dapat mengubah warna elemen desain secara terpisah, seperti:

- Main fabric color.
- Secondary color.
- Stripe color.
- Collar color.
- Sleeve color.
- Additional accent color.

Sediakan pilihan warna preset, color picker, dan input HEX.

Perubahan warna harus langsung terlihat pada preview 2D dan 3D.

Jangan membatasi pengguna hanya pada kombinasi warna bawaan template.

## 4. Text Customization

Setiap template dapat memiliki elemen teks bawaan, seperti:

- Nama pemain.
- Nomor punggung.
- Nama tim.
- Sponsor.
- Custom text.

Pengguna dapat memilih elemen teks yang tersedia dan mengubah kontennya.

Sediakan pengaturan:

- Text content.
- Font family.
- Font size.
- Font weight.
- Text color.
- Text alignment.
- Rotation.
- Position.
- Opacity.

Pengguna juga dapat menambahkan teks baru, memindahkan posisi teks, mengubah ukuran, serta menghapus teks yang tidak diperlukan.

Pastikan teks pada bagian depan dan belakang dapat diedit secara independen.

Jangan menjadikan tulisan pada template sebagai gambar statis yang tidak dapat diedit.

## 5. Horizontal & Vertical Stripe Builder

Tambahkan fitur untuk menambahkan garis pada jersey.

Pengguna dapat memilih dua orientasi garis:

**Horizontal Stripes**
- Garis melintang pada permukaan jersey.
- Warna garis dapat diubah.
- Ketebalan dapat diatur.
- Posisi dapat disesuaikan.
- Pengguna dapat menambahkan lebih dari satu garis.

**Vertical Stripes**
- Garis memanjang pada permukaan jersey.
- Warna garis dapat diubah.
- Ketebalan dapat diatur.
- Posisi dapat disesuaikan.
- Pengguna dapat menambahkan lebih dari satu garis.

Sediakan kontrol untuk memilih area penerapan garis, minimal:

- Front.
- Back.

Jika memungkinkan berdasarkan struktur model, dukung juga area lengan.

Setiap garis harus menjadi elemen desain yang dapat dipilih, diedit, dipindahkan, dan dihapus secara independen.

Pastikan garis mengikuti permukaan jersey dan tidak terlihat melayang atau terputus secara tidak wajar pada hasil 3D.

## 6. Sleeve Pattern Customization

Tambahkan fitur pemilihan motif khusus untuk masing-masing lengan.

Lengan kanan dan kiri harus memiliki konfigurasi independen.

Sediakan beberapa pilihan motif awal, seperti:

- Solid.
- Horizontal Stripes.
- Vertical Stripes.
- Diagonal Stripes.
- Geometric.
- Gradient.
- Custom Pattern.

Pengguna dapat memilih motif lengan kanan tanpa harus mengubah lengan kiri, begitu pula sebaliknya.

Sediakan pengaturan warna utama dan warna aksen untuk motif lengan.

Tampilkan preview motif sebelum diterapkan.

Pastikan motif diterapkan pada bagian lengan yang benar pada model 3D dan tidak tertukar antara kiri dan kanan.

## 7. Front & Back Mapping Correction

Perbaiki masalah pemetaan Front dan Back pada Jersey Customizer yang saat ini tertukar.

Lakukan audit terhadap:

- Jersey surface identification.
- Canvas surface mapping.
- Texture assignment.
- Decal projection.
- UV mapping.
- Model mesh references.
- Front/back camera orientation.
- Export surface mapping.

Pastikan area Front benar-benar menampilkan desain bagian depan jersey dan area Back menampilkan desain bagian belakang.

Gunakan identifikasi mesh dan orientasi model yang telah diverifikasi, bukan hanya mengandalkan nama variabel atau asumsi posisi.

Periksa juga pemetaan lengan kanan, lengan kiri, bahu kanan, dan bahu kiri agar tidak terjadi kesalahan serupa.

Lakukan validasi dengan artwork pengujian yang berbeda pada setiap sisi sehingga kesalahan pemetaan dapat diketahui dengan jelas.

## 8. Editor UI/UX

Susun ulang bagian Jersey Customizer agar fitur baru mudah digunakan.

Kelompokkan kontrol menjadi:

1. Templates.
2. Colors.
3. Text.
4. Stripes.
5. Sleeve Patterns.
6. Layers.

Sediakan preview 2D dan 3D yang tetap sinkron.

Pastikan pengguna dapat berpindah antara Front, Back, Left Sleeve, Right Sleeve, Left Shoulder, dan Right Shoulder.

Gunakan tampilan yang profesional, intuitif, dan konsisten dengan identitas visual aplikasi.

Pertahankan fitur yang sudah tersedia seperti undo, redo, layer management, color picker, dan artwork editor.

## 9. 3D Synchronization

Semua elemen desain baru harus dapat ditampilkan pada model Jersey 3D.

Pastikan:

- Template terlihat pada model 3D.
- Perubahan warna langsung diterapkan.
- Teks memiliki posisi dan orientasi yang benar.
- Garis mengikuti geometri dan UV mapping.
- Motif lengan muncul pada sisi yang tepat.
- Front dan Back tidak tertukar.
- Rotasi 360 derajat tetap berfungsi.

Hindari membuat preview 2D dan 3D menggunakan data desain yang berbeda.

Gunakan satu sumber data desain yang konsisten.

## 10. Project Persistence & Export

Simpan seluruh konfigurasi desain ke dalam project data Supabase yang sudah tersedia.

Data yang harus dipertahankan:

- Selected template.
- Color configuration.
- Text elements.
- Stripe elements.
- Sleeve patterns.
- Surface assignments.
- Element positions.
- Layer ordering.
- Design metadata.

Pastikan project lama dari Phase 4–6 tetap dapat dibuka.

Gunakan pendekatan backward-compatible untuk data project yang belum memiliki konfigurasi template baru.

Perbarui sistem export agar seluruh elemen desain baru ikut masuk ke:

- PNG.
- JPEG.
- ZIP.
- 3D mockup.
- UV texture export.

Jangan hanya menampilkan elemen baru di editor tanpa memasukkannya ke hasil export.

## 11. Technical Requirements

Gunakan arsitektur dan teknologi yang sudah digunakan aplikasi:

- React.
- TypeScript.
- Three.js.
- React Three Fiber.
- Fabric.js.
- Zustand.
- Supabase.

Buat sistem template berbasis konfigurasi yang reusable dan mudah dikembangkan.

Pisahkan data template, rendering, editor controls, dan persistence logic.

Hindari hardcoding setiap template langsung di komponen UI.

Jangan menambahkan model GLB baru untuk setiap variasi warna atau template jika konfigurasi material dan texture pada model yang sudah ada dapat digunakan.

Perhatikan performa rendering dan penggunaan texture memory.

## 12. Testing & Acceptance Criteria

Phase ini dinyatakan berhasil apabila:

- Pengguna dapat memilih beberapa template jersey.
- Kombinasi warna dapat diubah secara independen.
- Teks bawaan template dapat diedit.
- Pengguna dapat menambahkan dan menghapus teks.
- Horizontal stripes dapat ditambahkan dan dikustomisasi.
- Vertical stripes dapat ditambahkan dan dikustomisasi.
- Motif lengan kanan dan kiri dapat dipilih secara independen.
- Front dan Back sudah dipetakan dengan benar.
- Keenam area desain jersey bekerja sesuai bagiannya.
- Seluruh perubahan terlihat pada preview 2D dan 3D.
- Undo dan redo tetap bekerja.
- Desain tersimpan dan dapat dipulihkan setelah refresh.
- Project lama tetap kompatibel.
- Semua elemen baru masuk ke hasil export.
- Tidak ada regresi pada T-shirt Designer.
- TypeScript check berhasil.
- ESLint berhasil.
- Production build berhasil.

Lakukan pengujian visual langsung, bukan hanya mengandalkan keberhasilan build.

## 13. Final Report

Laporkan:

- Fitur yang berhasil diimplementasikan.
- Template yang tersedia.
- Sistem pengaturan warna dan teks.
- Stripe Builder.
- Sleeve Pattern Customization.
- Hasil perbaikan Front/Back mapping.
- Sinkronisasi 2D dan 3D.
- Integrasi Supabase dan export.
- File yang dibuat atau diubah.
- Hasil pengujian dan bug yang ditemukan.

Gunakan status PASS, FAIL, BLOCKED, dan NOT TESTED.

Jangan mengklaim fitur berhasil jika belum diuji secara visual dan fungsional.