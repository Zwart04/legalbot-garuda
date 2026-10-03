# LawBot — AI Indonesian Legal Q&A for UMKM

## Fitur Utama

### 1. Interactive Legal Questionnaire Wizard
AI-powered step-by-step wizard yang mengajukan pertanyaan hukum secara adaptif berdasarkan konteks UMKM dari pengguna. Setiap jawaban membentuk skenario hukum lengkap yang bisa langsung dijadikan referensi. Menggunakan MiniSearch TF-IDF untuk relevance ranking dari UU corpus.

### 2. UU Reference Database dengan TF-IDF Search
Database regulasi Indonesia (UU, PERMEN, PERPUS) yang bisa dicari dengan search semantik berbasis TF-IDF. Fitur highlight keyword, filter berdasarkan bidang hukum, dan timestamp effective date untuk memastikan pengguna selalu merujuk regulasi yang berlaku.

### 3. Template Dokumen Generator (DOCX/PDF)
Generator dokumen hukum siap pakai: kontrak UMKM, surat permohonan, nota dingo, dan dokumen pendukung lainnya. Ekspor ke DOCX (docx package) dan PDF (jsPDF + autotable). Template bisa dikustomisasi dan disimpan ke inventory pengguna.

### 4. Compliance Checklist
Checklist kepatuhan berbasis bidang usaha dan skala UMKM. Setiap item checklist terhubung ke referensi UU yang relevan. Progress tracker dan status kepatuhan secara visual dengan badge valid/not-valid/pending.

### 5. Risk Score Analyzer
Analisis risiko hukum otomatis berdasarkan jawaban questionnaire. Skor ditampilkan dalam bentuk visualisasi Recharts bar chart, dikelompokkan per kategori: kontraktual, kepatuhan, properti, ketenagakerjaan. Rekomendasi mitigasi per risiko tinggi.

### 6. Analytics Dashboard
Dashboard metrik interaksi pengguna: jumlah query yang diajukan, UU paling sering diakses, template dokumen yang paling digenerate, trend pencarian. Semua dicatat dari analytics tab dengan source attribution berdasarkan UTM params + localStorage.

### 7. Finance Journal Otomatis
Setiap action pengguna (template generate, UU diakses, analisis risiko dibuka) mencatat ke finance journal otomatis. Tag sumber: auto-task, auto-bill, auto-vendor. Ekspor ke Excel via SheetJS.

### 8. Bilingual EN/ID Toggle
Toggle bahasa penuh EN/ID di seluruh aplikasi. Semua label, tooltip, dan konten menggunakan dictionary t.*. Bilingual wajib sesuai user preference. Tanpa emoji, desain clean minimal SaaS.

## Notification

- In-app toast (shadcn Toast / react-hot-toast) untuk notifikasi real-time
- `wa.me` share-link untuk berbagi hasil analisis ke WhatsApp
- NO WAHA tab, NO WAHA API

## Attribution (NO Pixel/GA)

- Baca UTM params (`?utm_source=...&utm_medium=...`) saat pertama kunjungan
- Simpan ke `localStorage.source`
- Tampilkan chart Recharts bar di halaman `/analytics` untuk menunjukkan sumber traffic
- NO fbq, NO gtag, NO Meta Pixel, NO Google Ads

## Tech Stack

- Next.js 16 App Router + TypeScript + Tailwind v4 + shadcn/ui
- Recharts untuk visualisasi data
- lucide-react untuk icon
- MiniSearch untuk TF-IDF search
- docx + jsPDF untuk document generation
- localStorage untuk auth dan state
- Cloudflare Pages untuk deployment

## Routes (13)

1. `/` — Landing page dengan hero + CTA
2. `/login` — Halaman login
3. `/register` — Halaman register
4. `/dashboard` — Dashboard utama
5. `/questionnaire` — Interactive legal questionnaire wizard
6. `/uu-database` — UU reference database + search
7. `/template-generator` — Template dokumen generator
8. `/compliance` — Compliance checklist
9. `/risk-analysis` — Risk score analyzer
10. `/analytics` — Analytics dashboard + source attribution chart
11. `/finance-journal` — Finance journal otomatis
12. `/settings` — Pengaturan akun
13. `/404` — Halaman not found

## Notification Spec

- In-app toast via react-hot-toast / shadcn Toast
- `wa.me` share-link untuk share hasil
- NO WAHA, NO Pixel/GA

## Attribution Spec

- UTM params → localStorage.source
- Recharts bar chart di /analytics
- NO fbq, NO gtag

## Finance Auto-Journal

Setiap action: template generate / UU diakses / analisis dibuka → journal entry otomatis dengan tag auto-task/auto-bill/auto-vendor
