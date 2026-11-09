# Supabase Integration & Authentication

**Project:** Virtual Clothing Designer  
**Project Root:** `D:\fullstack\virtual_desgin`  
**Frontend:** React 19 + TypeScript + Vite 6  
**Backend Service:** Supabase

---

## 1. Objective

Mengintegrasikan aplikasi Virtual Clothing Designer dengan project Supabase yang sebenarnya.

Integrasi mencakup:

- Supabase client configuration.
- User registration.
- Email verification.
- User login.
- User logout.
- Session persistence.
- Password reset.
- Authentication state management.
- Protected routes.
- User profile management.
- Project persistence.
- Supabase Storage.

Seluruh fitur harus menggunakan Supabase secara nyata, bukan mock authentication atau simulasi lokal.

## 2. Environment Configuration

File: `.env.local`

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY
```

Ketentuan:

- Gunakan Project URL dan Publishable Key milik project Supabase.
- Pertahankan nama environment variable yang digunakan source code.
- Jangan hardcode credentials.
- Jangan mencetak API key ke console.
- Jangan gunakan `service_role` atau secret key di frontend.
- Pastikan `.env.local` masuk `.gitignore`.
- Pertahankan `.env.example` menggunakan placeholder.

## 3. Authentication Features

### 3.1 Registration

Implementasikan registrasi dengan:

- Full name.
- Email.
- Password.
- Confirm password.

Ketentuan:

1. Validasi semua input.
2. Validasi format email.
3. Password minimal 8 karakter.
4. Password dan confirmation harus cocok.
5. Gunakan Supabase `signUp`.
6. Simpan informasi profil pada tabel `profiles` sesuai schema.
7. Jangan menganggap registrasi berhasil berarti email sudah terverifikasi.
8. Jika email confirmation aktif, tampilkan halaman atau pesan untuk memeriksa inbox.
9. Tangani email yang sudah terdaftar dan error lainnya.

### 3.2 Email Verification

Email verification wajib berfungsi menggunakan Supabase Auth.

Alur:

1. Pengguna melakukan registrasi.
2. Supabase mengirim email konfirmasi.
3. Pengguna membuka email.
4. Pengguna mengklik verification link.
5. Supabase memproses callback.
6. Aplikasi memverifikasi session dan status email.
7. Pengguna diarahkan ke halaman yang sesuai.

Ketentuan:

- Gunakan mekanisme verification Supabase yang sesuai dengan konfigurasi project.
- Implementasikan callback route, misalnya `/auth/callback`.
- Pastikan token atau authorization code diproses dengan aman.
- Tangani verification link expired.
- Tangani verification link invalid.
- Berikan tombol resend verification email.
- Berikan feedback ketika email berhasil dikirim ulang.
- Jangan menganggap pengguna verified hanya berdasarkan query parameter.
- Periksa status verifikasi dari session/user Supabase.
- Jangan memberikan akses ke fitur yang mensyaratkan verified email sebelum status terverifikasi.

### 3.3 Login

Implementasikan login menggunakan:

- Email.
- Password.

Ketentuan:

- Gunakan Supabase `signInWithPassword`.
- Tangani email belum terverifikasi.
- Tangani password salah.
- Tangani akun yang tidak ditemukan.
- Tampilkan loading state.
- Tampilkan pesan error yang mudah dipahami.
- Setelah login berhasil, arahkan ke halaman aplikasi yang sesuai.

### 3.4 Logout

Implementasikan logout menggunakan Supabase `signOut`.

Pastikan:

- Session dihapus.
- Authentication state diperbarui.
- Pengguna diarahkan ke halaman publik.
- Protected route tidak lagi dapat diakses.

### 3.5 Password Reset

Implementasikan fitur forgot password.

Alur:

1. Pengguna memasukkan email.
2. Aplikasi mengirim reset email menggunakan Supabase.
3. Pengguna membuka link.
4. Pengguna diarahkan ke reset password page.
5. Pengguna memasukkan password baru.
6. Password diperbarui menggunakan Supabase Auth.

Tangani token expired dan invalid.

## 4. Authentication State Management

Buat authentication state management yang terpusat dan reusable.

State minimal:

- Initializing.
- Unauthenticated.
- Authenticated.
- Email verification required.
- Error.

Ketentuan:

- Gunakan `supabase.auth.onAuthStateChange`.
- Pulihkan session saat aplikasi dimulai.
- Sinkronkan perubahan session.
- Hindari duplicate subscriptions.
- Unsubscribe saat provider/service tidak lagi digunakan.
- Jangan menyimpan password atau token secara manual di localStorage.

## 5. Routing & Access Control

Implementasikan routing berdasarkan status autentikasi.

| Route | Access |
|---|---|
| `/` | Public |
| `/login` | Guest |
| `/register` | Guest |
| `/verify-email` | Public verification information |
| `/auth/callback` | Authentication callback |
| `/forgot-password` | Public |
| `/reset-password` | Valid recovery session |
| `/projects` | Authenticated |
| `/designer/*` | Sesuai kebijakan aplikasi |

Ketentuan:

- Pengguna yang sudah login tidak perlu kembali ke login/register.
- Pengguna yang belum login tidak boleh mengakses halaman privat.
- Pengguna yang belum verified tidak boleh mengakses fitur yang mensyaratkan verifikasi.
- Jangan hanya mengandalkan proteksi frontend; database tetap dilindungi RLS.

## 6. Supabase Database

Audit schema yang sudah tersedia:

- `profiles`
- `projects`

Gunakan migration Phase 5 yang sudah ada.

Pastikan:

- `profiles.id` memiliki relasi ke `auth.users.id`.
- Profil pengguna dibuat dengan mekanisme yang konsisten.
- `projects.user_id` mereferensikan pengguna yang memiliki project.
- RLS aktif.
- Policy SELECT, INSERT, UPDATE, DELETE membatasi akses berdasarkan `auth.uid()`.

Jangan membuat tabel duplikat.

Jangan menjalankan migration destruktif.

Jika schema belum diterapkan, siapkan SQL migration yang aman dan minta persetujuan pengguna sebelum menjalankannya.

## 7. Supabase Storage

Periksa bucket:

- `project-artwork`
- `project-thumbnails`

Pastikan:

- Upload dan download berjalan.
- File disimpan dengan struktur path yang konsisten berdasarkan user ID.
- Pengguna hanya dapat mengakses file miliknya sesuai policy.
- Delete project menangani file terkait sesuai kebutuhan.
- MIME type dan ukuran file divalidasi.

Jangan mengubah bucket menjadi public hanya untuk mengatasi masalah permission.

## 8. Project Persistence

Setelah autentikasi berhasil:

- Project tersimpan ke Supabase.
- Project dapat dimuat kembali.
- Data T-shirt front/back dipertahankan.
- Data Jersey enam panel dipertahankan.
- Artwork dan thumbnail dapat dipulihkan.
- CRUD hanya berlaku untuk project yang dimiliki pengguna.

Guest mode boleh menggunakan localStorage sesuai implementasi Phase 5.

Jangan diam-diam menggunakan localStorage untuk pengguna yang sudah login jika Supabase gagal.

## 9. UI/UX Requirements

Pertahankan identitas desain aplikasi.

Pastikan tersedia:

- Register page.
- Login page.
- Verify email page.
- Resend verification action.
- Forgot password page.
- Reset password page.
- Authentication callback loading state.
- Error state.
- Success notification.
- Loading state.

Gunakan desain konsisten dengan theme light/dark yang sudah diimplementasikan.

Pastikan responsive desktop, tablet, dan mobile.

Jangan merombak halaman yang tidak terkait.

## 10. Security Requirements

- Publishable key hanya untuk frontend.
- Tidak ada service role key di browser.
- RLS wajib aktif.
- Verifikasi email harus diperiksa melalui status Auth yang valid.
- Validasi input.
- Jangan percaya user ID dari input frontend untuk menentukan kepemilikan.
- Jangan menyimpan password secara manual.
- Jangan membocorkan token ke log.
- Jangan mengandalkan route guard sebagai pengganti RLS.
- Jangan menonaktifkan email confirmation untuk membuat pengujian lebih mudah.

## 11. Testing Requirements

Uji skenario berikut:

1. Register dengan data valid.
2. Register dengan email invalid.
3. Register dengan password tidak cocok.
4. Register dengan email yang sudah terdaftar.
5. Email verification terkirim.
6. Verification link valid.
7. Verification link expired.
8. Resend verification.
9. Login sebelum verifikasi.
10. Login setelah verifikasi.
11. Login dengan password salah.
12. Session tetap ada setelah refresh.
13. Logout.
14. Protected route tanpa login.
15. Forgot password.
16. Reset password.
17. Project CRUD setelah login.
18. RLS antar dua akun berbeda.

## 12. Acceptance Criteria

Integrasi dinyatakan selesai apabila:

- Supabase client berhasil diinisialisasi.
- Register berfungsi.
- Email verification benar-benar terkirim.
- Verification link dapat diproses.
- Status verified diperiksa dari Supabase Auth.
- Login dan logout berfungsi.
- Session persistence berfungsi.
- Password reset berfungsi.
- Protected route berfungsi.
- Database RLS terverifikasi.
- Project persistence berfungsi.
- Storage upload dan download berfungsi.
- Tidak ada secret key di frontend.
- TypeScript check, ESLint, dan production build berhasil.

## 13. Final Report

Buat laporan dengan status:

- PASS
- FAIL
- BLOCKED
- NOT TESTED

Pisahkan hasil pemeriksaan kode dan pengujian terhadap Supabase remote.

Laporkan:

- File yang dibuat/diubah.
- Konfigurasi Supabase.
- Database migration.
- Authentication flow.
- Email verification.
- Routing.
- RLS.
- Storage.
- Project persistence.
- Security checks.
- TypeScript, ESLint, dan build.
- Manual steps yang masih diperlukan.

Jangan mengklaim email verification berhasil jika belum melakukan pengujian menggunakan inbox email sungguhan.

Jangan lanjut Phase 7 sebelum integrasi ini selesai diverifikasi.