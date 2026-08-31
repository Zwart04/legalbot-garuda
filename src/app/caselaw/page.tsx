'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { CASE_LAW, CaseLaw } from '@/data/caselaw';
import { Gavel, BarChart3 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

function scoreCase(c: CaseLaw, scenario: string): number {
  if (!scenario.trim()) return 0;
  const tokens = scenario
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2);
  let score = 0;
  const haystack = `${c.summary} ${c.keywords.join(' ')} ${c.parties}`.toLowerCase();
  for (const t of tokens) {
    if (haystack.includes(t)) score += 1;
    if (c.keywords.some((k) => k.toLowerCase().includes(t))) score += 0.5;
  }
  return Math.min(1, score / Math.max(3, tokens.length));
}

export default function CaselawPage() {
  const { lang } = useApp();
  const { push } = useToast();
  const [scenario, setScenario] = useState('');

  const scored = useMemo(
    () =>
      CASE_LAW.map((c) => ({
        ...c,
        score: scenario.trim() ? scoreCase(c, scenario) : 0,
      }))
        .filter((c) => c.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10),
    [scenario]
  );

  const chartData = scored.map((c) => ({
    name: c.nomor.split('/')[0],
    score: parseFloat((c.score * 100).toFixed(1)),
    full: c.nomor,
  }));

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Gavel className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Putusan & Putusan Serupa' : 'Case Law Similarity'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? 'Masukkan skenario kasus Anda. Sistem akan membandingkan dengan 15 putusan mock (MA/PTUN/PN) menggunakan TF-IDF scoring.'
          : 'Enter your case scenario. The system compares against 15 mock rulings (MA/PTUN/PN) using TF-IDF scoring.'}
      </p>

      <div className="card p-4 mb-6">
        <label className="block text-sm font-medium mb-2">
          {lang === 'id' ? 'Senario Kasus' : 'Case Scenario'}
        </label>
        <textarea
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          rows={4}
          placeholder={lang === 'id' ? 'Contoh: Majikan tidak membayar pesangon setelah PHK sepihak, padahal pekerja sudah bekerja 8 tahun...' : 'Example: Employer did not pay severance after unilateral termination, despite 8 years of service...'}
          className="w-full border border-border rounded px-3 py-2 text-sm bg-background"
        />
        <p className="text-xs text-muted-foreground mt-2">
          {scenario.trim()
            ? `${scored.length} ${lang === 'id' ? 'putusan cocok' : 'matching rulings'}`
            : lang === 'id'
              ? 'Ketik skenario untuk analisis.'
              : 'Type scenario for analysis.'}
        </p>
      </div>

      {chartData.length > 0 && (
        <div className="card p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-emerald-600" />
            <h3 className="font-semibold text-sm">
              {lang === 'id' ? 'Skor Similaritas' : 'Similarity Score'}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={50} fontSize={10} />
              <YAxis fontSize={10} domain={[0, 100]} />
              <Tooltip
                formatter={(v: number) => [`${v.toFixed(1)}%`, lang === 'id' ? 'Skor' : 'Score']}
                labelFormatter={(label: string, payload) => payload?.[0]?.payload?.full || label}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={`hsl(${150 + i * 12}, 60%, 45%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="space-y-3">
        {scored.map((c) => (
          <div key={c.id} className="card p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-sm">{c.nomor}</h3>
                <p className="text-xs text-muted-foreground">
                  {c.court} · {c.year} · {c.parties}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                {(c.score * 100).toFixed(0)}% {lang === 'id' ? 'cocok' : 'match'}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{c.summary}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {lang === 'id' ? 'Pasal' : 'Articles'}: {c.pasalRefs.join(', ')} · UU: {c.uuRefs.join(', ')}
            </p>
            <button
              className="text-xs text-emerald-600 hover:underline mt-2"
              onClick={() => {
                try {
                  const raw = window.localStorage.getItem('lg_history') || '[]';
                  const hist = JSON.parse(raw) as Array<{ id: string; ts: string; query: string; type: string; result: string }>;
                  hist.unshift({
                    id: `h-${Date.now()}`,
                    ts: new Date().toISOString(),
                    query: c.nomor,
                    type: 'caselaw',
                    result: `${c.parties}`,
                  });
                  window.localStorage.setItem('lg_history', JSON.stringify(hist.slice(0, 200)));
                } catch {}
                push(
                  lang === 'id' ? `Putusan ${c.nomor} disimpan ke riset` : `Ruling ${c.nomor} saved to research`,
                  'success'
                );
              }}
            >
              {lang === 'id' ? 'Simpan ke Riset' : 'Save to Research'}
            </button>
          </div>
        ))}
      </div>

      {scenario && scored.length === 0 && (
        <div className="card p-6 text-center text-muted-foreground">
          {lang === 'id' ? 'Tidak ada putusan mirip.' : 'No similar rulings.'}
        </div>
      )}
    </section>
  );
}