# LegalBot Garuda

> AI hukum Indonesia untuk UMKM & praktisi: pasal lookup + RAG-lite KUHP/UU + case-law similarity + auto-template kontrak (surat kuasa, somasi, NDA).

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[Live Demo](https://legalbot-garuda.zwart.qzz.io) · [GitHub](https://github.com/Zwart04/legalbot-garuda)

## Features

- **Pasal Lookup Engine** — TF-IDF + cosine similarity scoring ke korpus 30+ pasal dari 12 UU. Top-10 pasal dengan snippet highlight.
- **UU Browser** — 12 UU terstruktur (KUHP, KUHAP, UU Perkawinan, UU Ketenagakerjaan, UU Cipta Kerja, UU Perlindungan Konsumen, UU Perseroan Terbatas, UU Hak Cipta, UU Merek, UU Perlindungan Data Pribadi, UU ITE, UU Arbitrase). Filter by kategori, accordion expand, full-text search.
- **Case-Law Similarity** — 15 putusan mock (MA + PTUN + PN) dengan scoring similarity per skenario kasus. Recharts bar chart per skor.
- **Contract Template Generator** — 6 template (Surat Kuasa, Somasi, NDA, MoU, ToS, PKWT) dengan form input multi-field. Auto-fill placeholder, validasi wajib. Export TXT atau share via wa.me.
- **Riset Sesi & History** — localStorage simpan semua query pasal, lookup case-law, generate template. Filter by source_tag, mark favorit, export TXT ringkasan.
- **Legal Dictionary** — 40+ istilah hukum ID: novasi, subrogasi, wanprestasi, cidera janji, force majeure, insolvensi, eksekusi, daluarsa, kompensasi, fidusia, hipotek, dll. Definisi + pasal rujukan.
- **Finance Auto-Journal** — Auto-catat setiap aksi dengan `source_tag` (`auto-template`/`auto-research`/`auto-export`/`auto-lookup`) dan amount IDR mock. Area chart cumulative. Export CSV.
- **Source Attribution Analytics** — UTM/URL-param reader (`?utm_source=wa&utm_medium=share`) → `localStorage.source` on first visit. Recharts bar chart + Pie chart. NO Meta Pixel, NO Google Ads, NO third-party script.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 + OKLCH theme |
| Icons | lucide-react |
| Charts | Recharts |
| Search | MiniSearch (TF-IDF + fuzzy + prefix) |
| File Export | file-saver (TXT, CSV) |
| Sharing | wa.me deep-link |
| Persistence | Browser localStorage (no server, no DB) |
| Hosting | Cloudflare Pages |
| Domain | `*.zwart.qzz.io` |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Build

```bash
npm install
npm run build
npm start
```

Visit `http://localhost:3000`.

### Static Export

The project uses `output: 'export'` (see `next.config.js`) so it builds to `out/` and can be deployed to any static host:

```bash
npx wrangler pages deploy out --project-name=legalbot-garuda --branch=main --commit-dirty=true
```

## Project Structure

```
legalbot-garuda/
├── src/
│   ├── app/
│   │   ├── analytics/        # Source attribution charts
│   │   ├── browser/          # UU Browser (12 UU accordion)
│   │   ├── caselaw/          # Case Law similarity
│   │   ├── dashboard/        # Main dashboard (8 feature cards)
│   │   ├── dictionary/       # Legal glossary
│   │   ├── finance/          # Auto-finance journal
│   │   ├── history/          # Research history
│   │   ├── lookup/           # Pasal Lookup Engine
│   │   ├── template/         # Contract generator
│   │   ├── login/            # Auth page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home (redirects to /dashboard)
│   │   └── globals.css
│   ├── components/
│   │   ├── Providers.tsx     # AppProvider + ToastProvider wrapper
│   │   ├── Header.tsx        # Bilingual nav + theme toggle + auth
│   │   ├── Footer.tsx        # Footer
│   │   └── ToastContainer.tsx
│   ├── data/
│   │   ├── corpus.ts         # 12 UU + 30+ pasal
│   │   └── caselaw.ts        # 15 mock rulings
│   └── lib/
│       ├── auth.tsx          # Auth + AppProvider context
│       ├── toast.tsx         # Toast notification system
│       ├── i18n.ts           # Bilingual EN/ID dictionary
│       └── utils.ts          # cn, formatIDR, formatDate
├── public/
│   └── icon.svg              # Scale/balance favicon
├── FEATURES.md               # Full feature spec
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Demo Account

The login page is pre-filled with `demo@legalbot.id`. Click **Masuk** to log in as a demo user (no registration required). Use the language toggle (ID/EN) in the header to switch between Indonesian and English.

## Privacy & Attribution

This app has **zero third-party tracking**:
- No Meta Pixel / `fbq`
- No Google Ads / `gtag`
- No `NEXT_PUBLIC_*_ADS_ID` environment variables
- No external script tags

Source attribution works entirely via `localStorage` — when a visitor arrives with `?utm_source=...` in the URL, the value is persisted on first visit and charted in the Analytics tab.

## Roadmap

- Pasal lookup corpus expansion to 200+ UU (via peraturan.go.id scraping pipeline)
- RAG integration with Indonesian Supreme Court (MA) putusan API
- Multi-language export (DOCX/PDF) for contract templates
- Side-by-side UU comparison view

## License

MIT — see [LICENSE](LICENSE).

(c) 2026 Zwart — https://zwart.my.id