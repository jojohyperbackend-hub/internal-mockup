# 🚀 internal-mockup

> **Ultimate Full-Stack internal Mockup Builder** — Design sebelum coding dimulai. Drag & drop komponen UI, edit  preview responsif, ekspor HTML siap pakai, dan simpan project ke database MariaDB.

---

## 📋 Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Nuxt 4 (Vue 3) |
| Styling | Tailwind CSS via `@tailwindcss/vite` |
| Backend | Nitro (built-in Nuxt server engine) |
| Database | MariaDB |
| DB Driver | `mysql2` |
| DB Manager | HeidiSQL / phpMyAdmin |
| Bundler | Vite |
| Language | TypeScript |

---

## 📁 Struktur Folder

```
internal-mockup/
│
├── app/
│   ├── app.vue                   ← Entry point Nuxt 4
│   ├── styles/
│   │   └── globals.css           ← Global CSS
│   ├── layouts/
│   │   └── default.vue           ← Layout global (1 layout)
│   └── pages/
│       ├── index.vue             ← Landing page
│       └── dashboard.vue         ← Mockup builder utama
│
├── server/
│   ├── api/
│   │   └── crud/
│   │       └── route.ts          ← REST API CRUD (GET/POST/PUT/DELETE)
│   └── database/
│       └── config.ts             ← Koneksi MariaDB via mysql2
│
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── .env.local                    ← Kredensial database (tidak di-commit)
├── .gitignore
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚡ Quick Start

### 1. Clone Project

```bash
git clone https://github.com/jojohyperbackend-hub/internal-mockup.git
cd internal-mockup
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat File `.env.local`

```bash
cat > .env.local << 'EOF'
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=mockupbulderv1
DB_PORT=3306
EOF
```

> Sesuaikan `DB_USER`, `DB_PASSWORD`, dan `DB_NAME` dengan konfigurasi MariaDB kamu.

### 4. Setup Database

Jalankan SQL script di bawah menggunakan **HeidiSQL** atau **phpMyAdmin** — lihat section [Setup Database](#-setup-database).

### 5. Jalankan Dev Server

```bash
npm run dev --no-fork
```

Buka browser: **http://localhost:3000**

---

## 🗄️ Setup Database

### Cara Pakai di HeidiSQL

```
1. Buka HeidiSQL
2. Connect ke: Host=127.0.0.1, Port=3306, User=root
3. Klik menu → Tools → SQL Editor
4. Paste SQL script di bawah
5. Tekan F9 atau klik tombol Run (▶)
```

### Cara Pakai di phpMyAdmin

```
1. Buka http://localhost/phpmyadmin
2. Klik tab "SQL" di bagian atas
3. Paste SQL script di bawah
4. Klik tombol "Go"
```

### SQL Script

```sql
-- ================================================
-- DATABASE: mockupbulderv1
-- ================================================

CREATE DATABASE IF NOT EXISTS `mockupbulderv1`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `mockupbulderv1`;

-- ================================================
-- TABLE: mockup_projects
-- ================================================

CREATE TABLE IF NOT EXISTS `mockup_projects` (
  `id`          INT             NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(255)    NOT NULL,
  `layout_json` LONGTEXT        NOT NULL,
  `thumbnail`   TEXT            DEFAULT NULL,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- VERIFY
-- ================================================

SELECT * FROM `mockup_projects`;
```

---

## 🔌 API Endpoints

Base URL: `http://localhost:3000/api/crud`

| Method | Endpoint | Body / Query | Deskripsi |
|---|---|---|---|
| `GET` | `/api/crud` | — | Ambil semua project |
| `GET` | `/api/crud?id=1` | `query: id` | Ambil project by ID |
| `POST` | `/api/crud` | `{ name, layout_json, thumbnail }` | Simpan project baru |
| `PUT` | `/api/crud` | `{ id, name, layout_json, thumbnail }` | Update project |
| `DELETE` | `/api/crud?id=1` | `query: id` | Hapus project |

---

## 🎨 Fitur Utama

### 1. Drag & Drop Canvas
Seret komponen dari panel kiri ke kanvas putih. Tersedia komponen: Navbar, Hero, Footer, Section, Card, 3-Col Grid, Text Block, Banner, Contact Form, Search Bar, Alert, Stats Row, Pricing Card.

### 2. Tailwind Class Editor
Klik blok di canvas → edit Tailwind class di panel kanan. Perubahan apply otomatis secara real-time. Tersedia juga quick class chips untuk spacing, layout, typography, color, dan border.

### 3. Responsive Preview
Switch breakpoint di topbar:
- **Desktop** — 1280px
- **Tablet** — 768px
- **Mobile** — 375px

### 4. Export HTML
Klik tombol **↓ Export HTML** → download file `.html` standalone dengan Tailwind CDN sudah terpasang. Siap dibuka di browser atau dijadikan starting point coding.

### 5. Save & Load Project
- **Save** — simpan layout JSON ke database MariaDB
- **Load** — muat project tersimpan dari database
- **Delete** — hapus project dari database

---

## ⚠️ Known Issues & Solusi

Dokumentasi masalah yang ditemui saat development dan cara mengatasinya.

---

### ❌ Issue 1: IPC Connection Closed

**Error:**
```
IPC connection closed
at Socket.onClose (node_modules/@nuxt/vite-builder/dist/vite-node.mjs)
```

**Penyebab:**
Node.js v22 tidak kompatibel dengan Nuxt 4 + Vite worker. Vite spawns worker process terpisah untuk dev server, dan pada Node v22 ada perubahan behavior di IPC socket handling yang menyebabkan crash.

**Solusi:**
```bash
npm run dev --no-fork
```

> Flag `--no-fork` membuat Nuxt menjalankan Vite dalam proses yang sama tanpa spawn worker terpisah. Tidak perlu downgrade Node.

---

### ❌ Issue 2: Cannot Find Module globals.css

**Error:**
```
Cannot find module '~/app/styles/globals.css'
imported from 'virtual:nuxt:.nuxt/css.mjs'
ERR_MODULE_NOT_FOUND
```

**Penyebab:**
Di Nuxt 4, alias `~/` resolve ke root project, bukan ke folder `app/`. Path `css: ['~/app/styles/globals.css']` di `nuxt.config.ts` mencari file di lokasi yang salah.

**Solusi final:**
Hapus `css: []` dari `nuxt.config.ts`. Tailwind sudah di-inject otomatis oleh Vite plugin.

```typescript
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
})
```

---

### ❌ Issue 3: @import "tailwindcss" Trigger IPC Crash

**Error:**
```
IPC connection closed (muncul setelah @import ditambahkan)
```

**Penyebab:**
Menulis `@import "tailwindcss"` di `globals.css` menyebabkan Vite plugin memproses Tailwind dua kali — double processing ini trigger crash pada Node v22.

**Solusi:**
Hapus `@import "tailwindcss"` dari `globals.css`. Tailwind aktif via Vite plugin tanpa perlu `@import` eksplisit.

```css
/* globals.css — tanpa @import tailwindcss */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: monospace;
}
```

---

### ❌ Issue 4: ENOENT server/database/config

**Error:**
```
Error: Could not load D:/path/app//server/database/config
ENOENT: no such file or directory
```

**Penyebab:**
Di Nuxt 4, folder `server/` berada di root project bukan di dalam `app/`. Alias `~/` di dalam file server resolve ke `app/` sehingga path menjadi `app/server/database/config` yang tidak ada.

**Solusi:**
```typescript
// ❌ Salah
import pool from '~/server/database/config'

// ✅ Benar — relative dari server/api/crud/ naik 2 level
import pool from '../../database/config'
```

---

### ❌ Issue 5: Invalid End Tag Vue Compiler

**Error:**
```
SyntaxError: Invalid end tag.
at /pages/index.vue?macro=true
frame: "68 | Lihat Demo\n69 | </a>"
```

**Penyebab:**
Vue compiler strict soal tag nesting. Tag `</a>` pada baris terpisah setelah konten teks menyebabkan parser salah interpretasi closing tag.

**Solusi:**
```html
<!-- ❌ Berpotensi error -->
<a href="#cara-kerja" class="...">
  Lihat Demo
</a>

<!-- ✅ Aman -->
<a href="#cara-kerja" style="...">Lihat Demo</a>
```

---

### ❌ Issue 6: Nuxt 4 Struktur Folder Berbeda dari Nuxt 3

**Perbandingan:**

| File | Nuxt 3 | Nuxt 4 |
|---|---|---|
| Entry point | `/app.vue` | `/app/app.vue` |
| Pages | `/pages/` | `/app/pages/` |
| Layouts | `/layouts/` | `/app/layouts/` |
| Server | `/server/` | `/server/` (sama) |

> `main.ts` tidak ada di Nuxt — itu konvensi Vue 3 vanilla. Di Nuxt, `app.vue` menggantikan peran `main.ts` sepenuhnya.

---

## 🛠️ Scripts

```bash
# Development (gunakan --no-fork untuk Node v22)
npm run dev --no-fork

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "mysql2": "latest"
  },
  "devDependencies": {
    "nuxt": "latest",
    "@tailwindcss/vite": "latest",
    "tailwindcss": "latest",
    "typescript": "built-in"
  }
}
```

---

## 🔐 Environment Variables

| Variable | Default | Deskripsi |
|---|---|---|
| `DB_HOST` | `127.0.0.1` | Host database MariaDB |
| `DB_USER` | `root` | Username database |
| `DB_PASSWORD` | _(kosong)_ | Password database |
| `DB_NAME` | `mockupbulderv1` | Nama database |
| `DB_PORT` | `3306` | Port database |

> File `.env.local` tidak di-commit ke Git (sudah ada di `.gitignore`).

---

## 👨‍💻 Developer Notes

Project ini dikembangkan menggunakan **Node.js v22.20.0** dengan beberapa workaround karena Nuxt 4 belum fully stable di Node v22. Semua known issues sudah didokumentasikan di atas beserta solusinya.

Rekomendasi environment:
- **Node.js**: v20.x (paling stabil) atau v22.x dengan flag `--no-fork`
- **Package Manager**: npm
- **Database**: MariaDB 10.x / MySQL 8.x
- **DB Manager**: HeidiSQL atau phpMyAdmin
- **OS**: Windows / Linux / macOS

---

*internal-mockup — Built with Nuxt 4, Tailwind CSS, Nitro & MariaDB* 🚀
