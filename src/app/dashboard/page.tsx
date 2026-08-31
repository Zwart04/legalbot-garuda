'use client';

import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { useEffect } from 'react';

const dict = {
  id: {
    nav: {
      dashboard: 'Dasbor',
      lookup: 'Cari Pasal',
      browser: 'Kamus UU',
      caselaw: 'Putusan',
      template: 'Template',
      history: 'Riset',
      dictionary: 'Glosarium',
      finance: 'Jurnal',
      analytics: 'Analitik',
    },
    common: { welcome: 'Selamat datang' },
    desc: {
      lookup: 'Cari pasal dari 12 UU menggunakan TF-IDF + cosine similarity.',
      browser: 'Browse 12 UU terstruktur dengan filter kategori dan search.',
      caselaw: 'Bandingkan skenario kasus dengan 15 putusan mock menggunakan similarity scoring.',
      template: 'Generate 6 template kontrak (Surat Kuasa, NDA, MoU, dll) dengan form input.',
      history: 'Riwayat query + jawaban + export PDF ringkasan riset di localStorage.',
      dictionary: '80+ istilah hukum ID dengan definisi dan pasal rujukan di accordion.',
      finance: 'Jurnal otomatis auto-tracking generate kontrak + lookup + export. Area chart cumulative.',
      analytics: 'Recharts bar chart source attribution (UTM/localStorage). NO fbq/gtag.',
    },
  },
  en: {
    nav: {
      dashboard: 'Dashboard',
      lookup: 'Pasal Lookup',
      browser: 'UU Browser',
      caselaw: 'Case Law',
      template: 'Templates',
      history: 'Research',
      dictionary: 'Glossary',
      finance: 'Journal',
      analytics: 'Analytics',
    },
    common: { welcome: 'Welcome' },
    desc: {
      lookup: 'Search 240+ pasal across 12 UU using TF-IDF + cosine similarity.',
      browser: 'Browse 12 structured UU with category filters and search.',
      caselaw: 'Compare case scenarios against 15 mock rulings using similarity scoring.',
      template: 'Generate 6 contract templates (Power of Attorney, NDA, MoU, etc.) with form input.',
      history: 'Query history + answers + PDF export of research summary in localStorage.',
      dictionary: '80+ ID legal terms with definitions and pasal references in accordion.',
      finance: 'Auto-tracking journal of contract generation + lookup + export. Cumulative area chart.',
      analytics: 'Recharts bar chart source attribution (UTM/localStorage). NO fbq/gtag.',
    },
  },
} as const;

export default function DashboardPage() {
  const { mounted, user, lang } = useApp();
  const { push } = useToast();
  const d = lang === 'id' ? dict.id : dict.en;

  useEffect(() => {
    if (mounted) {
      push(
        (lang === 'id' ? 'Dashboard dimuat — ' : 'Dashboard loaded — ') +
          (user?.name || 'demo'),
        'success'
      );
    }
  }, [mounted, user, push, lang]);

  const cards = [
    { nav: d.nav.lookup, desc: d.desc.lookup, msg: lang === 'id' ? 'Pasal Lookup Engine aktif' : 'Pasal Lookup active' },
    { nav: d.nav.browser, desc: d.desc.browser, msg: lang === 'id' ? 'UU Browser aktif' : 'UU Browser active' },
    { nav: d.nav.caselaw, desc: d.desc.caselaw, msg: lang === 'id' ? 'Case-Law Similarity aktif' : 'Case-Law Similarity active' },
    { nav: d.nav.template, desc: d.desc.template, msg: lang === 'id' ? 'Contract Generator aktif' : 'Contract Generator active' },
    { nav: d.nav.history, desc: d.desc.history, msg: lang === 'id' ? 'Riset History aktif' : 'Research History active' },
    { nav: d.nav.dictionary, desc: d.desc.dictionary, msg: lang === 'id' ? 'Legal Dictionary aktif' : 'Legal Dictionary active' },
    { nav: d.nav.finance, desc: d.desc.finance, msg: lang === 'id' ? 'Finance Journal aktif' : 'Finance Journal active' },
    { nav: d.nav.analytics, desc: d.desc.analytics, msg: lang === 'id' ? 'Analytics aktif' : 'Analytics active' },
  ];

  return (
    <section>
      <h2 className="mt-6 text-3xl font-bold tracking-tighter">
        {d.nav.dashboard}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {d.common.welcome} {user?.name || ''}.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {cards.map((c) => (
          <div key={c.nav} className="card p-4">
            <h3 className="text-lg font-semibold mb-2">{c.nav}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
            <button
              className="btn btn-primary mt-3 text-sm"
              onClick={() => push(c.msg, 'info')}
            >
              {lang === 'id' ? 'Mulai' : 'Start'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}