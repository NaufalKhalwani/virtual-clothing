# Phase 3.1, 3.2 & Phase 4 — Theme System, Quality Assurance & Jersey Customizer

**Project:** Virtual Clothing Designer  
**Project Directory:** `D:\fullstack\virtual_desgin`

---

# PART 1 — PHASE 3.1: DARK MODE & LIGHT MODE

## 1. Objective

Implementasikan sistem tema Dark Mode dan Light Mode secara menyeluruh pada aplikasi Virtual Clothing Designer.

Sistem tema harus konsisten, reusable, responsive, dan mudah dikembangkan.

Jangan mengubah atau merusak fitur Phase 1, Phase 2, dan Phase 3.

## 2. Theme System

Buat sistem theme menggunakan CSS variables atau design tokens.

Seluruh komponen harus menggunakan theme tokens, termasuk:

- Background
- Surface dan card
- Primary dan secondary text
- Border dan divider
- Button
- Input dan textarea
- Sidebar dan toolbar
- Modal dan dropdown
- Tooltip
- Panel editor
- Navigation
- Empty state dan notification

Hindari hardcoded colors yang menyebabkan inkonsistensi.

## 3. Theme Behavior

Implementasikan:

- Dark Mode.
- Light Mode.
- Toggle tema dengan ikon yang sesuai.
- Simpan preferensi menggunakan localStorage.
- Gunakan system preference pada kunjungan pertama.
- Pertahankan pilihan pengguna setelah refresh.
- Perubahan tema harus diterapkan tanpa reload halaman.

Jika pengguna sudah memilih tema secara manual, pilihan tersebut harus mengalahkan preferensi sistem.

## 4. Theme Design

**Light Mode:**
- Clean white background.
- Light gray secondary surfaces.
- Dark readable typography.
- Subtle borders.
- Professional and minimal appearance.

**Dark Mode:**
- Charcoal atau dark neutral background.
- Dark gray surfaces.
- Light readable typography.
- Subtle borders.
- Comfortable contrast.

Jangan menggunakan warna hitam pekat untuk semua permukaan.

Pastikan kedua tema tetap memiliki hierarki visual yang jelas.

## 5. 3D Viewer Compatibility

Theme switching tidak boleh mengubah:

- Warna kain T-shirt.
- Artwork.
- Text design.
- Material model 3D.
- Texture mapping.
- Design canvas contents.

Sesuaikan background dan lighting environment viewer bila diperlukan, tetapi jangan mengubah warna asli produk atau hasil desain pengguna.

## 6. Responsive Design

Pastikan theme toggle mudah ditemukan dan digunakan pada desktop maupun mobile.

Semua komponen harus tetap terbaca dan nyaman digunakan pada kedua tema.

---

# PART 2 — PHASE 3.2: QUALITY ASSURANCE

## 7. Objective

Lakukan audit menyeluruh terhadap seluruh implementasi Phase 1, Phase 2, dan Phase 3.

Jangan hanya mengandalkan hasil TypeScript, ESLint, atau production build. Uji fungsionalitas aplikasi secara langsung.

## 8. Artwork Testing

Verifikasi:

- Upload PNG, JPG, JPEG, dan WebP.
- Validasi file maksimal 10 MB.
- Drag and drop artwork.
- Paste artwork menggunakan Ctrl+V / Cmd+V.
- Menambahkan banyak artwork.
- Move, resize, rotate, dan delete.
- Duplicate artwork.
- Pengaturan opacity.
- Layer ordering.
- Batas area cetak.
- Artwork tetap proporsional.

## 9. Text Testing

Verifikasi:

- Menambahkan text.
- Mengedit isi text.
- Mengubah font.
- Mengubah font size.
- Mengubah font weight.
- Mengubah warna.
- Mengubah alignment.
- Memindahkan dan memutar text.
- Menghapus dan menduplikasi text.

## 10. Front & Back Testing

Verifikasi:

- Desain front dan back tersimpan secara independen.
- Berpindah permukaan tidak menghapus desain.
- Kamera berpindah ke sudut yang sesuai.
- Artwork muncul pada sisi yang benar.
- Artwork tidak terbalik atau mirrored.
- Desain tetap sesuai ketika model diputar 360 derajat.

## 11. Undo & Redo Testing

Verifikasi:

- Undo dan redo artwork.
- Undo dan redo text.
- Undo dan redo perubahan properti.
- Keyboard shortcuts.
- History tidak mencatat terlalu banyak snapshot ketika objek sedang di-drag.
- History front dan back tidak saling tercampur.

## 12. 3D Rendering Audit

Audit integrasi Fabric.js dengan Three.js.

Periksa:

- Decal positioning.
- Texture orientation.
- Artwork scale.
- Artwork rotation.
- Z-fighting.
- Material compatibility.
- Texture disposal.
- Memory management.

Pastikan artwork benar-benar terlihat pada model 3D, bukan hanya pada canvas 2D.

Periksa juga apakah proyeksi Decal menyebabkan artwork terdistorsi pada permukaan kain yang melengkung.

Jika ditemukan masalah, perbaiki menggunakan pendekatan teknis yang sesuai dengan struktur GLB.

## 13. Responsive Testing

Uji aplikasi pada viewport:

- 320px
- 375px
- 390px
- 768px
- 1024px
- 1280px
- 1440px

Pastikan tidak ada:

- Horizontal overflow.
- Panel bertumpuk secara tidak semestinya.
- Tombol terpotong.
- Toolbar yang sulit digunakan.
- Editor yang tertutup panel lain.
- Interaksi touch yang mengganggu rotasi 3D.

## 14. Regression Testing

Pastikan seluruh fitur sebelumnya tetap berfungsi:

- Landing page.
- Garment selection.
- Routing.
- T-shirt 3D viewer.
- 360-degree rotation.
- Camera presets.
- Auto-rotate.
- Wireframe mode.
- Color customization.
- Artwork editor.
- Text editor.
- Layer management.
- Undo dan redo.

Perbaiki bug yang ditemukan tanpa menghilangkan fitur yang sudah ada.

---

# PART 3 — PHASE 4: JERSEY CUSTOMIZER

## 15. Objective

Implementasikan fitur Jersey Customizer yang memungkinkan pengguna mendesain jersey secara detail melalui enam area desain independen.

Jersey Customizer harus memiliki pengalaman penggunaan dan kualitas visual yang konsisten dengan T-shirt Designer.

Jangan membangun ulang aplikasi. Integrasikan fitur ini ke arsitektur yang sudah ada.

## 16. Jersey Model Preparation

Periksa apakah file berikut tersedia:

`public/models/jersey.glb`

Jika tersedia:

- Inspect seluruh mesh.
- Inspect material.
- Inspect UV coordinates.
- Identifikasi bagian depan dan belakang.
- Identifikasi lengan kiri dan kanan.
- Identifikasi area bahu kiri dan kanan.
- Pastikan struktur model mendukung enam area desain.

Jika file belum tersedia, jangan menggunakan `tshirt.glb` sebagai pengganti jersey dan jangan membuat klaim bahwa integrasi 3D sudah selesai.

Laporkan kebutuhan model jersey secara jelas. Jika memungkinkan, siapkan arsitektur dan komponen customizer agar model dapat diintegrasikan kemudian.

Jangan membuat UV mapping palsu atau menebak posisi permukaan.

## 17. Six Independent Design Surfaces

Buat enam area desain:

1. Front
2. Back
3. Left
4. Right
5. Left Shoulder
6. Right Shoulder

Masing-masing area harus memiliki:

- Canvas independen.
- Artwork independen.
- Text independen.
- Layer independen.
- History independen.
- Texture mapping yang sesuai.

Ketika pengguna berpindah area, desain sebelumnya harus tetap tersimpan.

Jangan sampai artwork pada area Front muncul pada Back atau Shoulder.

## 18. Jersey 3D Viewer

Implementasikan viewer 3D untuk jersey.

Requirements:

- 360-degree rotation.
- Zoom in dan zoom out.
- Camera presets.
- Front view.
- Back view.
- Left view.
- Right view.
- Isometric view.
- Auto-rotate.
- Lighting yang realistis.
- Shadow yang natural.

Pengguna harus bisa melihat seluruh bagian jersey dengan jelas.

Pastikan kamera tidak berpindah ke posisi yang salah ketika pengguna mengganti area desain.

## 19. Jersey Artwork Customization

Gunakan kembali artwork editor dari Phase 3.

Pengguna harus dapat:

- Upload artwork.
- Drag and drop.
- Paste dari clipboard.
- Menambahkan banyak gambar.
- Move.
- Resize.
- Rotate.
- Duplicate.
- Delete.
- Mengatur opacity.
- Mengelola layer.

Gunakan kembali komponen yang sudah ada apabila memungkinkan.

Jangan menduplikasi implementasi tanpa alasan teknis.

## 20. Jersey Text Customization

Gunakan kembali Text Editor dari Phase 3.

Pengguna harus dapat:

- Menambahkan nama pemain.
- Menambahkan nomor punggung.
- Menambahkan tulisan.
- Mengubah font.
- Mengubah ukuran.
- Mengubah warna.
- Mengubah weight.
- Mengubah alignment.
- Memindahkan dan memutar text.

Semua text harus menjadi bagian dari desain texture 3D.

## 21. Jersey Color Customization

Implementasikan pengaturan warna jersey.

Minimal mendukung:

- Main body color.
- Secondary color jika material model mendukung.
- Sleeve color jika material model mendukung.
- Collar color jika material model mendukung.

Pastikan perubahan warna tidak menghilangkan artwork dan text.

Jika model hanya memiliki satu material yang tidak memungkinkan pemisahan warna secara akurat, jelaskan keterbatasannya dan jangan membuat kontrol warna yang tidak benar-benar bekerja.

## 22. Jersey UI/UX

Buat interface profesional dan konsisten.

**Desktop:**

- Left panel: tools dan pemilihan area.
- Center: 3D jersey viewer.
- Right panel: properti artwork, text, dan warna.
- Toolbar: undo, redo, reset, dan viewer controls.

**Mobile:**

- Viewer menjadi fokus utama.
- Tools menggunakan bottom sheet atau collapsible panel.
- Area selector mudah diakses.
- Kontrol touch-friendly.
- Tidak ada horizontal overflow.

Gunakan kembali theme system dari Phase 3.1.

Jersey Customizer harus mendukung Dark Mode dan Light Mode sepenuhnya.

## 23. State Management

Integrasikan dengan Zustand yang sudah ada.

Pastikan:

- State jersey terpisah dari state T-shirt.
- Setiap area memiliki desain independen.
- History setiap area tidak saling tercampur.
- Switching garment tidak menghapus desain.
- State tidak menyimpan instance Fabric.js secara langsung.
- Gunakan tipe TypeScript yang jelas.

Gunakan arsitektur reusable untuk mendukung kemungkinan penambahan jenis pakaian lain pada masa mendatang.

## 24. Texture Integration

Integrasikan canvas dengan material jersey menggunakan pendekatan Three.js yang sesuai dengan model.

Periksa UV mapping aktual.

Pastikan:

- Front design muncul pada bagian depan.
- Back design muncul pada bagian belakang.
- Left dan Right design muncul pada lengan yang tepat.
- Shoulder design muncul pada bahu yang tepat.
- Artwork tidak mirrored.
- Artwork tidak upside down.
- Tidak terjadi texture bleeding ke area lain.
- Tidak terjadi z-fighting.
- Texture tidak mengalami memory leak.

Jika membutuhkan beberapa material atau texture atlas, implementasikan berdasarkan struktur model aktual.

## 25. Acceptance Criteria

Phase 4 dianggap selesai jika:

- Jersey GLB berhasil dimuat.
- Model dapat diputar 360 derajat.
- Enam area desain dapat dipilih.
- Setiap area menyimpan desain independen.
- Upload artwork berfungsi.
- Text editor berfungsi.
- Layer management berfungsi.
- Undo dan redo berfungsi.
- Color customization berfungsi sesuai kemampuan material.
- Desain tampil benar pada model 3D.
- Dark Mode dan Light Mode berfungsi.
- Responsive pada desktop dan mobile.

Jangan mengklaim Phase 4 selesai jika model jersey belum tersedia atau texture mapping belum terbukti benar.

---

# PART 4 — DEVELOPMENT & VALIDATION

## 26. Development Rules

- Pertahankan seluruh implementasi yang sudah ada.
- Gunakan TypeScript secara konsisten.
- Ikuti arsitektur project.
- Gunakan reusable components.
- Hindari duplikasi kode.
- Hindari hardcoded configuration.
- Jangan membuat dummy implementation.
- Jangan menghapus fitur yang sudah berjalan.
- Perhatikan performance dan memory management.

## 27. Final Validation

Jalankan:

```bash
npx tsc -b
npm run lint
npm run build
```

Perbaiki seluruh error yang ditemukan.

Uji fitur secara langsung melalui browser.

## 28. Final Report

Berikan laporan yang mencakup:

1. Fitur Dark Mode dan Light Mode.
2. Hasil audit dan perbaikan Phase 3.
3. Fitur Jersey Customizer yang berhasil dibuat.
4. File baru dan file yang dimodifikasi.
5. Dependency yang ditambahkan.
6. Analisis mesh, material, dan UV jersey.
7. Hasil pengujian enam area desain.
8. Hasil responsive testing.
9. TypeScript, ESLint, dan production build.
10. Kendala dan fitur yang belum selesai.

**Prioritas utama adalah fungsionalitas yang benar-benar bekerja, integrasi 3D yang akurat, dan kualitas UI/UX yang konsisten.**