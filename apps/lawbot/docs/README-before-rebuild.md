# LawBot

> AI Indonesian Legal Q&A for UMKM — Interactive legal assistant for small business owners.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare_Pages-F68234?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com/)

**[Live Demo](https://lawbot.zwart.qzz.io)** | [Report Bug](https://github.com/Zwart04/lawbot/issues) | [Request Feature](https://github.com/Zwart04/lawbot/issues)

---

## About

LawBot is an AI-powered legal Q&A wizard designed for UMKM (Usaha Mikro, Kecil, dan Menengah) in Indonesia. It provides scenario-based legal guidance through an interactive questionnaire, a searchable database of Indonesian laws (UU), document template generation (DOCX/PDF), compliance tracking, and risk analysis — all in one platform.

Built with Next.js 16, TypeScript, Tailwind CSS v4, and shadcn/ui. Bilingual (English/Indonesian). No third-party tracking — attribution via UTM parameters and localStorage.

## Features

### Interactive Legal Questionnaire
Multi-step questionnaire that adapts to your business profile. Six questions covering business type, employee count, revenue, sector, legal issues, and experience level. Provides personalized legal guidance and a risk score.

### UU Reference Database
Searchable database of Indonesian laws (Undang-Undang) relevant to UMKM businesses. Powered by TF-IDF relevance ranking using MiniSearch. Browse by category or search by keyword.

### Document Template Generator
Generate professional legal documents instantly from customizable templates — surat permohonan, perjanjian kerja, kontrak vendor, surat pemberitahuan, and permohonan izin usaha. Export as DOCX or PDF.

### Compliance Checklist
Track your business compliance with Indonesian regulations. Checklist covers NIB, NPWP, AKTA, rekening koran, perjanjian kerja, and more. Progress tracking with visual indicators.

### Risk Score Analyzer
Analyze your business risk profile based on questionnaire answers. Receive actionable recommendations with visual charts (Recharts).

### Analytics Dashboard
Track LawBot usage with Recharts visualizations — sessions over time, top UU categories, traffic source attribution via UTM parameters. No third-party tracking scripts.

### Auto Finance Journal
Auto-tracked financial activities from LawBot usage. Add, edit, and delete journal entries with categories, amounts, and source tagging.

### Settings
Manage your account preferences — language (EN/ID), theme (light/dark), and password change. Demo account management for testing.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui (base-ui) |
| State | Redux Toolkit (auth) + React Context (lang/theme) |
| Charts | Recharts |
| Icons | lucide-react |
| PDF | jsPDF + jsPDF-AutoTable |
| DOCX | docx |
| Search | MiniSearch (TF-IDF) |
| Auth | localStorage-local (local-first, no backend) |
| Deployment | Cloudflare Pages |

## Project Structure

```
lawbot/
├── app/
│   ├── (app)/              # Authenticated app routes
│   │   ├── analytics/      # Usage analytics with Recharts
│   │   ├── compliance/     # Compliance checklist
│   │   ├── dashboard/      # Main dashboard
│   │   ├── finance-journal/# Auto finance journal
│   │   ├── layout.tsx      # App shell with sidebar nav
│   │   ├── questionnaire/  # Interactive legal questionnaire
│   │   ├── risk-analysis/  # Risk score analyzer
│   │   ├── settings/       # Account settings
│   │   ├── template-generator/ # DOCX/PDF document generator
│   │   └── uu-database/    # UU reference search
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers
├── components/
│   ├── Providers.tsx      # Redux + App + Toast providers
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── app-context.tsx    # Lang/theme/source context
│   ├── auth_slice.ts      # Redux auth slice
│   ├── i18n.ts            # EN/ID translation dicts
│   ├── store.ts           # Redux store
│   ├── translations-context.tsx
│   └── use-auth.ts        # Auth hooks
├── public/
│   └── icon.svg           # Favicon
├── next.config.js         # Static export config
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Zwart04/lawbot.git
cd lawbot
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Output in `out/` directory (static export).

### Demo Account

| Email | Password |
|---|---|
| admin@lawbot.id | admin123 |

## Deployment

Deployed on Cloudflare Pages via Wrangler:

```bash
npx wrangler pages deploy out --project-name=lawbot --branch=main
npx wrangler pages domain add --project-name=lawbot lawbot.zwart.qzz.io
```

## Policy

- **No WAHA** — notification via in-app toast (shadcn/Toast) + `wa.me` share-link
- **No Meta Pixel / Google Analytics** — attribution via UTM parameters → localStorage → Recharts bar chart in `/analytics`
- **No emoji** in UI or documentation
- **Bilingual** — full EN/ID toggle throughout

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Author

**[Muammar Fikri](https://github.com/Zwart04)** — zwart.my.id

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) — UI component foundation
- [Recharts](https://recharts.org/) — charting library
- [lucide-react](https://lucide.dev/) — icons
- [MiniSearch](https://github.com/lucaong/minisearch) — lightweight full-text search
