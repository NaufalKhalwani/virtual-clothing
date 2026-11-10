# PHASE 8.1 — Jersey Designer Refinement & Premium Templates

**Project:** Virtual Clothing Designer  
**Project Root:** `D:\fullstack\virtual_desgin`  
**Previous Phase:** Phase 8 — Advanced Jersey Template Customization

## 1. Objective

Melakukan penyempurnaan Jersey Designer berdasarkan hasil implementasi Phase 8 dan referensi visual yang diberikan.

Fokus pekerjaan:

- Memperbesar dan memberikan kontrol ukuran serta posisi tampilan desain Front dan Back.
- Memperbaiki sistem horizontal dan vertical stripes agar menjadi pola jersey yang profesional dan tidak menutupi elemen desain lainnya.
- Memperbaiki seluruh template yang mengalami kerusakan.
- Menambahkan koleksi premium jersey templates dengan variasi desain yang lebih profesional.
- Memastikan seluruh desain konsisten pada 2D editor, 3D preview, penyimpanan project, dan export.

Jangan membangun ulang fitur yang sudah berfungsi. Audit implementasi saat ini terlebih dahulu.

## 2. Front & Back Design Area Adjustment

Saat ini tampilan bagian depan dan belakang jersey terlihat terlalu kecil sehingga ruang desain tidak optimal.

Buat pengguna dapat menyesuaikan ukuran dan posisi area desain Front maupun Back secara independen.

### Adjustment Controls

Sediakan kontrol:

- Zoom in.
- Zoom out.
- Scale slider.
- Reset scale.
- Fit to canvas.
- Center horizontally.
- Center vertically.
- Position adjustment.

Pengguna dapat memperbesar atau memperkecil tampilan jersey dan mengatur posisi desain sesuai kebutuhan.

### Independent Front & Back Configuration

Pengaturan Front dan Back harus independen.

Contohnya:

- Front dapat menggunakan zoom 120%.
- Back dapat menggunakan zoom 150%.
- Posisi Front dan Back dapat berbeda.
- Mengubah pengaturan Back tidak boleh mengubah pengaturan Front.

Simpan pengaturan tampilan yang relevan agar dapat dipulihkan ketika project dibuka kembali.

### Important Behavior

Bedakan antara zoom viewport dan ukuran elemen desain.

Zoom viewport hanya mengubah tampilan editor, bukan mengubah ukuran asli artwork atau kualitas export.

Jika tersedia kontrol transform untuk area artwork atau print region, sediakan secara terpisah sehingga pengguna dapat mengatur ukuran dan posisi area desain tanpa mengubah seluruh viewport.

Pastikan pengaturan ini tidak mengubah geometri model 3D atau UV mapping.

## 3. Professional Stripe System

Perbaiki sistem horizontal dan vertical stripes.

Garis yang dimaksud adalah pola desain pada permukaan kain jersey, seperti jersey sepak bola profesional pada referensi gambar.

Bukan garis dekoratif yang ditempatkan sembarangan di atas seluruh artwork.

### Horizontal Stripes

Buat pola garis horizontal yang:

- Membentang secara teratur pada area kain yang dipilih.
- Memiliki jarak antar garis yang dapat diatur.
- Memiliki ketebalan yang dapat diatur.
- Memiliki warna utama dan warna sekunder.
- Dapat diatur jumlah garisnya.
- Dapat memiliki variasi ketebalan.
- Tidak menutupi teks, nomor pemain, logo, atau sponsor.

### Vertical Stripes

Buat pola garis vertikal dengan kontrol yang sama:

- Stripe count.
- Stripe width.
- Stripe spacing.
- Primary color.
- Secondary color.
- Position.
- Pattern scale.
- Pattern orientation.

Pengguna dapat membuat kombinasi garis vertikal seperti jersey klasik maupun desain modern.

### Pattern Layering & Text Protection

Pisahkan pattern layer dari text dan artwork layer.

Gunakan urutan rendering yang benar:

1. Base fabric.
2. Jersey pattern dan stripes.
3. Decorative elements.
4. Logo dan artwork.
5. Text dan player number.

Elemen teks, nomor, logo, dan sponsor harus tetap berada di atas pola garis.

Pattern tidak boleh menghapus atau menutupi elemen desain yang sudah dibuat pengguna.

Jika diperlukan, sediakan opsi pattern exclusion atau masking agar pola dapat dihindarkan dari area tertentu, khususnya area nomor pemain, nama pemain, sponsor, dan logo.

Pengguna tetap dapat mengatur posisi dan ukuran setiap elemen secara independen.

### Pattern Scope

Pengguna dapat menentukan penerapan pattern pada:

- Front.
- Back.
- Left Sleeve.
- Right Sleeve.
- Left Shoulder.
- Right Shoulder.

Jangan menerapkan pattern ke seluruh permukaan jersey secara otomatis apabila pengguna hanya memilih satu area.

### Pattern Rendering

Gunakan pendekatan yang sesuai dengan arsitektur editor saat ini, misalnya Fabric.js pattern, procedural texture, atau texture-based rendering.

Pastikan pattern mengikuti batas permukaan jersey dan UV mapping pada model 3D.

Hindari garis yang terlihat melayang, terputus, melengkung secara tidak wajar, atau melewati batas kain.

## 4. Existing Template Repair

Lakukan audit terhadap seluruh template yang tersedia pada Phase 8.

Saat ini beberapa template masih mengalami kerusakan dan belum menghasilkan desain yang sesuai dengan preview.

Periksa:

- Thumbnail template.
- Template configuration.
- Color mapping.
- Stripe generation.
- Surface assignment.
- Front/Back mapping.
- Sleeve mapping.
- UV orientation.
- Pattern scaling.
- Texture rendering.
- 2D dan 3D synchronization.

Setiap template harus memiliki konfigurasi yang valid dan dapat diterapkan ke model jersey.

Jangan menampilkan template yang rusak sebagai pilihan aktif.

Jika suatu template tidak dapat diperbaiki dengan aman, identifikasi penyebabnya dan ganti dengan implementasi yang valid.

### Template Preview Accuracy

Thumbnail harus mencerminkan desain template sebenarnya.

Jangan menggunakan thumbnail yang berbeda dari hasil penerapan template.

Pastikan preview tidak tertukar antara Front dan Back.

Pastikan warna dan pola pada thumbnail sesuai dengan konfigurasi template.

## 5. Premium Jersey Template Collection

Tambahkan koleksi premium template yang memiliki kualitas desain lebih tinggi dan variasi visual yang lebih kaya.

Template harus benar-benar dapat diterapkan dan dikustomisasi, bukan hanya berupa gambar mockup.

Buat minimal 12 template premium dengan karakter desain berbeda.

### Recommended Premium Templates

**A. Classic & Heritage**

1. Heritage Vertical Stripes — garis vertikal klasik dengan kombinasi dua atau tiga warna.
2. Retro Horizontal — garis horizontal retro dengan kerah dan aksen kontras.
3. Classic Panel — pembagian panel warna yang elegan.

**B. Modern & Minimalist**

4. Minimal Pro — desain minimalis dengan accent lines.
5. Split Identity — komposisi dua warna utama pada bagian badan.
6. Dynamic Side Panels — panel samping dengan bentuk geometris.

**C. Performance & Athletic**

7. Velocity — garis diagonal dinamis.
8. Aero Lines — pola garis tipis dengan komposisi modern.
9. Power Geometry — motif geometris pada bagian badan dan bahu.

**D. Elite & Signature**

10. Elite Gradient — kombinasi warna gradient yang elegan.
11. Signature Stripes — kombinasi garis horizontal dan vertikal yang terstruktur.
12. Royal Edition — desain eksklusif dengan aksen premium dan kombinasi warna yang kuat.

### Premium Design Quality

Setiap template harus memiliki:

- Komposisi visual yang seimbang.
- Kombinasi warna yang profesional.
- Pattern yang konsisten.
- Front dan Back design yang saling melengkapi.
- Sleeve design yang sesuai.
- Area teks dan nomor pemain yang jelas.
- Area logo dan sponsor yang tidak tertutup pattern.

Gunakan referensi gambar yang diberikan sebagai inspirasi komposisi desain.

Hindari menyalin desain klub, logo brand, atau identitas tim profesional yang memiliki hak cipta.

### Template Customization

Semua template harus tetap dapat dikustomisasi.

Pengguna dapat mengubah:

- Main color.
- Secondary color.
- Accent color.
- Stripe color.
- Collar color.
- Sleeve color.
- Pattern intensity.
- Pattern scale.
- Text.
- Player number.
- Logo dan sponsor.
- Pattern placement.

Template hanya menjadi titik awal desain, bukan hasil final yang terkunci.

## 6. Template Library UI/UX

Perbarui tampilan template selection agar lebih profesional.

Kelompokkan template berdasarkan kategori:

- Classic.
- Modern.
- Athletic.
- Premium.

Setiap template memiliki thumbnail yang jelas dan dapat menampilkan preview Front dan Back.

Sediakan informasi nama dan kategori template.

Pengguna dapat melihat preview sebelum menerapkan template.

Pastikan seluruh thumbnail memiliki proporsi dan kualitas visual yang konsisten.

Jangan membuat tombol premium yang tidak berfungsi atau mengunci fitur secara palsu.

## 7. Front & Back Mapping Validation

Pastikan perbaikan Front/Back dari pekerjaan sebelumnya tetap benar.

Lakukan pengujian dengan elemen visual yang mudah dibedakan:

- Front memiliki tulisan FRONT dan nomor 11.
- Back memiliki tulisan BACK dan nomor 99.

Pastikan masing-masing elemen muncul pada sisi yang benar.

Lakukan pengujian yang sama pada preview 2D, model 3D, project persistence, dan export.

Periksa kembali orientasi UV dan pemetaan mesh.

## 8. Persistence & Export Integration

Simpan seluruh konfigurasi baru ke project data yang sudah digunakan aplikasi.

Konfigurasi yang harus dipertahankan:

- Selected template.
- Template category.
- Color configuration.
- Stripe configuration.
- Pattern configuration.
- Pattern scope.
- Layer ordering.
- Front/Back editor viewport settings.
- Artwork positions.
- Text positions.
- Sleeve patterns.

Pastikan data project lama tetap kompatibel.

Jangan menghapus konfigurasi desain yang sudah tersimpan.

Semua template dan pattern harus muncul dengan benar pada:

- PNG export.
- JPEG export.
- ZIP export.
- 3D mockup export.
- UV texture export.

Zoom viewport tidak boleh mengubah resolusi atau ukuran output export.

## 9. Performance & Architecture

Pertahankan teknologi yang sudah digunakan:

- React.
- TypeScript.
- Three.js.
- React Three Fiber.
- Fabric.js.
- Zustand.
- Supabase.

Gunakan template configuration yang reusable dan data-driven.

Pisahkan template definitions, pattern generation, rendering, editor state, dan persistence.

Hindari menambahkan model GLB baru untuk setiap template.

Gunakan material dan texture yang sudah tersedia jika memungkinkan.

Hindari pembuatan texture baru secara berlebihan yang dapat menyebabkan memory leak.

## 10. Testing & Acceptance Criteria

Phase 8.1 dinyatakan selesai apabila:

- Front dan Back dapat di-zoom secara independen.
- Posisi tampilan Front dan Back dapat disesuaikan.
- Zoom viewport tidak mengubah ukuran export.
- Horizontal stripes berfungsi sebagai pola kain.
- Vertical stripes berfungsi sebagai pola kain.
- Stripe tidak menutupi teks, nomor, logo, dan sponsor.
- Pattern dapat diterapkan pada area yang dipilih.
- Pattern lengan kanan dan kiri tidak tertukar.
- Seluruh template lama telah diaudit dan diperbaiki.
- Minimal 12 premium templates tersedia dan berfungsi.
- Thumbnail sesuai dengan hasil template sebenarnya.
- Seluruh template dapat dikustomisasi.
- Front dan Back mapping benar.
- Preview 2D dan 3D sinkron.
- Project dapat disimpan dan dipulihkan.
- Export menampilkan seluruh pattern dengan benar.
- Project lama tetap kompatibel.
- T-shirt Designer tidak mengalami regresi.
- TypeScript check berhasil.
- ESLint berhasil.
- Production build berhasil.

Lakukan pengujian visual dan fungsional. Keberhasilan build saja tidak cukup untuk menyatakan fitur selesai.

## 11. Final Report

Laporkan:

- Hasil perbaikan Front/Back editor.
- Kontrol zoom dan position adjustment.
- Implementasi horizontal dan vertical stripes.
- Mekanisme perlindungan text dan artwork.
- Hasil audit template lama.
- Daftar minimal 12 premium templates.
- Hasil preview 2D dan 3D.
- Hasil persistence dan export.
- File yang dibuat dan diperbarui.
- Hasil TypeScript, ESLint, dan build.
- Bug yang belum terselesaikan.

Gunakan status PASS, FAIL, BLOCKED, dan NOT TESTED.

Jangan mengklaim template atau pattern berfungsi jika belum diuji secara visual dan fungsional.