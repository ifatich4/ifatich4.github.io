# Kitvue - Pegadaian Design System

## Tentang Kitvue
Kitvue adalah library komponen UI berbasis Vue.js yang mendukung pengembangan proyek Digital pada Pegadaian. Library ini menggunakan teknologi:
- **Vue.js 3.4.7**: Framework JavaScript modern.
- **Bootstrap 5.3.2**: Library CSS responsif.
- **Sass**: Preprocessor CSS untuk mempermudah styling.

Kitvue bertujuan menyediakan solusi desain yang konsisten dan efisien, mendukung pengembangan aplikasi Pegadaian dengan standar desain modern.

---

## Getting started

### Instalasi
Pastikan Anda sudah menginstal *prerequisite* berikut:
- **Node.js**: Versi 16 atau lebih baru.
- **npm**: Versi 8 atau lebih baru.

```bash
npm install https://repo.pegadaian.co.id/client/pegadaian-ui-kit-vue.git
```

## Langkah Konfigurasi untuk Proyek Vue
### Tambahkan Plugin Sass
Install plugin style-resource-loader untuk mendukung penggunaan file SCSS secara global:

```bash
vue add style-resource-loader
```

### Konfigurasi vue.config.js

```bash
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ['bootstrap-vue'],

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
})
```

### Perhatikan pada baris kode dibawah
```bash
transpileDependencies: ['bootstrap-vue'],

pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'scss',
        patterns: []
    }
}
```

## Struktur Branch untuk Pengembangan Kitvue
- `master`: Branch yang berisi versi stabil dari Kitvue. Branch ini digunakan untuk merilis package ke Artifactory Pegadaian.
- `dev-update-component`: Branch pengembangan utama. Semua fitur baru atau perbaikan akan di-review di branch ini sebelum di-merge ke master.

## Cara Berkontribusi pada Kitvue
Kami sangat mengapresiasi kontribusi dari developer lain untuk menambahkan komponen baru, memperbaiki styling, atau memperbaiki bug pada komponen yang ada.

### Langkah-Langkah Kontribusi

1. **Fork dan Clone Repository**
   - Fork repository `kitvue` ke akun git kamu.
   - Clone repository fork kamu:
     ```bash
     git clone https://repo.pegadaian.co.id/client/pegadaian-ui-kit-vue.git

     cd pegadaian-ui-kit-vue
     ```

2. **Checkout Branch Pengembangan**
   - Pastikan kamu selalu bekerja dari branch pengembangan, `dev-update-component`:
     ```bash
     git checkout dev-update-component
     ```

3. **Buat Branch Baru dari `dev-update-component`**
   - **Untuk Penambahan Komponen Baru:**
     - Buat branch baru dengan penamaan `dev-add-(nama-komponen)`:
     - Contoh jika kamu melakukan penambahan komponen button : 
       ```bash
       git checkout -b dev-add-button
       ```

   - **Untuk Update atau Bug Fixing Komponen yang Ada:**
     - Buat branch baru dengan penamaan `dev-update-(nama-komponen)`:
     - Contoh jika kamu melakukan penambahan komponen button : 
       ```bash
       git checkout -b dev-update-button
       ```

4. **Mulai Pengembangan**
   - **Penambahan Komponen Baru:**
     - Tambahkan komponen baru sesuai dengan standar kode yang telah disepakati.
     - Pastikan untuk menulis komentar dan menambahkan dokumentasi yang relevan.
  
   - **Update atau Bug Fixing:**
     - Perbaiki bug atau update styling komponen yang ada.
     - Tambahkan komentar untuk memastikan perubahan tersebut.

5. **Commit dan Push**
   - Buat commit yang jelas dan deskriptif:
     ```bash
     git commit -m "Add Button component with primary and secondary variants"
     git push origin dev-add-button
     ```

6. **Buka Merge Request (MR)**
   - Setelah selesai, buka Merge Request ke branch `dev-update-component`.
   - Tambahkan deskripsi lengkap mengenai perubahan dan penambahan yang kamu lakukan.

7. **Code Review**
   - Merge Request kamu akan di-review oleh maintainer proyek dari **Pegadaian Design**.
   - Jika ada catatan, lakukan perbaikan berdasarkan umpan balik yang diberikan.

8. **Merge ke `dev-update-component`**
   - Setelah review selesai, request akan di-merge ke `dev-update-component`.

# Penting Diperhatikan 
### Penamaan Branch

- **Penambahan Komponen Baru:**
  - Branch name: `dev-add-(nama-komponen)`
  - Contoh: `dev-add-button`, `dev-add-modal`

- **Perbaikan atau Update Komponen yang Ada:**
  - Branch name: `dev-update-(nama-komponen)`
  - Contoh: `dev-update-button`, `dev-update-card`

### Praktik Terbaik

- **Coding Style:** Ikuti pedoman coding style yang ada dalam proyek ini.
- **Test:** Selalu tambahkan atau perbarui unit tests untuk memastikan kode yang kamu tambahkan atau ubah berfungsi dengan baik.
- **Dokumentasi:** Jangan lupa untuk menambahkan atau memperbarui dokumentasi jika kamu menambahkan fitur baru atau mengubah yang sudah ada.
- **Jaga Kualitas:** Semua kode harus melalui proses review dan testing sebelum di-merge ke branch `dev-update-component`.

---

Terima kasih telah berkontribusi ke `kitvue!` Kami sangat menghargai usaha dan waktu yang kamu luangkan untuk membuat proyek ini menjadi lebih baik.
- **♡ Pegadaian Design ♡**
- **Love, Regard and Cheers. Happy Development**
