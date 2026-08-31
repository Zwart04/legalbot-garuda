# LegalBot Garuda - Features (8 kompleks)

## 1. Pasal Lookup Engine (Heavy AI/ML)
- Query bahasa natural Indonesia ("apa hukum kalau majikan tidak bayar pesangon?")
- TF-IDF + cosine similarity scoring ke korpus 240+ pasal dari 12 UU
- Top-10 pasal dengan snippet highlight match terms
- Pasal number, nama UU, kategori, effective date
- Filter by UU dan kategori

## 2. UU Browser (Knowledge base)
- 12 UU terstruktur: KUHP, KUHAP, UU Perkawinan, UU Ketenagakerjaan, UU Cipta Kerja, UU Perlindungan Konsumen, UU Perseroan Terbatas, UU Hak Cipta, UU Merek, UU Perlindungan Data Pribadi, UU ITE, UU Arbitrase
- Filter by kategori (pidana/perdata/perusahaan/ketenagakerjaan/HKI)
- Accordion expand per UU
- Search dalam UU

## 3. Case-Law Similarity (RAG-lite)
- 15 putusan mock (MA + PTUN + Pengadilan Negeri)
- Input skenario kasus → scoring similarity
- Bar chart Recharts similarity score
- Ringkasan + pasal rujukan per putusan

## 4. Contract Template Generator (Document automation)
- 6 template: Surat Kuasa, Somasi, NDA, MoU, Terms of Service, Perjanjian Kerja Waktu Tertentu (PKWT)
- Form input kustom (nama pihak, nilai, durasi, yurisdiksi)
- Auto-fill placeholder + validasi field wajib
- Export DOCX + preview HTML

## 5. Riset Sesi & History (Workflow tracking)
- localStorage simpan semua query pasal + lookup case-law + generate template
- Search history by keyword/date
- Mark favorit
- Export PDF ringkasan riset (jsPDF)
- Filter by source_tag (auto-research/auto-template/auto-export)

## 6. Legal Dictionary (Glossary)
- 80+ istilah hukum ID: gugatan, novasi, subrogasi, wanprestasi, cidera janji, force majeure, insolvensi, eksekusi, novasi, daluarsa, kompensasi, restitusi, dll
- Definisi + pasal rujukan terkait
- Accordion expand + search

## 7. Finance Auto-Journal (Auto-tracking, BUKAN ledger CRUD)
- Auto-catat setiap aksi: generate template, lookup pasal, download DOCX
- source_tag: auto-template / auto-research / auto-export
- amount_idr mock (5000-50000) untuk simulasi cost per aksi
- Tabel + Recharts area chart cumulative
- Tab Finance terpisah

## 8. Source Attribution & Analytics (NO Pixel, NO Google Ads)
- UTM/URL-param reader (`?utm_source=wa&utm_medium=share`) → localStorage.source (one-time)
- Recharts bar chart by source di tab Analytics
- NO fbq, NO gtag, NO NEXT_PUBLIC_*_ADS_ID
- NO third-party script injection

## NON-Fitur (Boss policy 2026-08-29)
- NO /waha/ tab
- NO WAHA API integration
- NO Meta Pixel fbq
- NO Google Ads gtag
- NO NEXT_PUBLIC_META_PIXEL_ID
- NO NEXT_PUBLIC_GOOGLE_ADS_ID

## Notification spec (Boss policy 2026-08-29)
- in-app toast (shadcn Toast) untuk success/error
- mailto: share (email mock)
- wa.me deep-link (window.open)