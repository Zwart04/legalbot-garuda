'use client';

import { useState, useMemo, useEffect } from 'react';
import MiniSearch from 'minisearch';
import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { getAllPasal, CATEGORY_LABEL, Pasal } from '@/data/corpus';
import { Search, BookOpen, Filter } from 'lucide-react';

const PAGE_SIZE = 8;

export default function LookupPage() {
  const { lang, source } = useApp();
  const { push } = useToast();
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [page, setPage] = useState(1);

  const allPasal = useMemo(() => getAllPasal(), []);

  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<Pasal & { combined: string }>({
      fields: ['text', 'keywords', 'uu', 'uuShort'],
      storeFields: ['id', 'uu', 'uuShort', 'pasal', 'category', 'effective', 'text', 'keywords'],
      searchOptions: { boost: { keywords: 2 }, fuzzy: 0.2, prefix: true },
    });
    ms.addAll(allPasal);
    return ms;
  }, [allPasal]);

  const results: (Pasal & { score: number })[] = useMemo(() => {
    if (!query.trim()) return [];
    const r = miniSearch.search(query, { combineWith: 'OR' });
    return r.slice(0, 30).map((hit) => ({
      ...(hit as unknown as Pasal),
      score: hit.score,
    }));
  }, [query, miniSearch]);

  const filtered = activeCat === 'all' ? results : results.filter((r) => r.category === activeCat);
  const paged = filtered.slice(0, page * PAGE_SIZE);

  // Save to history when results render
  useEffect(() => {
    if (!query.trim() || results.length === 0) return;
    try {
      const raw = window.localStorage.getItem('lg_history') || '[]';
      const hist = JSON.parse(raw) as Array<{ id: string; ts: string; query: string; type: string; result: string }>;
      hist.unshift({
        id: `h-${Date.now()}`,
        ts: new Date().toISOString(),
        query,
        type: 'lookup',
        result: `${results.length} pasal`,
      });
      window.localStorage.setItem('lg_history', JSON.stringify(hist.slice(0, 200)));
    } catch {}
  }, [query, results.length]);

  const categories = Object.keys(CATEGORY_LABEL) as Array<keyof typeof CATEGORY_LABEL>;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Cari Pasal' : 'Pasal Lookup'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? `Pencarian semantic ke ${allPasal.length}+ pasal dari 12 UU. Coba: "pesangon", "penipuan online", "PHK sepihak", "perlindungan data".`
          : `Semantic search across ${allPasal.length}+ pasal from 12 UU. Try: "severance", "online fraud", "wrongful termination", "data privacy".`}
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder={lang === 'id' ? 'Ketik pertanyaan hukum... (contoh: pesangon)' : 'Type legal question... (e.g. severance)'}
          className="flex-1 border border-border rounded px-3 py-2 text-sm bg-background"
        />
        {query && (
          <button
            className="btn btn-primary text-sm"
            onClick={() => {
              push(
                lang === 'id'
                  ? `Mencari pasal: ${query}`
                  : `Searching for: ${query}`,
                'info'
              );
              if (source) {
                try {
                  const raw = window.localStorage.getItem('lg_attribution') || '[]';
                  const arr = JSON.parse(raw) as Array<{ source: string; ts: string }>;
                  arr.push({ source, ts: new Date().toISOString() });
                  window.localStorage.setItem('lg_attribution', JSON.stringify(arr));
                } catch {}
              }
            }}
          >
            {lang === 'id' ? 'Cari' : 'Search'}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCat('all')}
          className={`text-xs px-2 py-1 rounded border ${activeCat === 'all' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:bg-muted'}`}
        >
          <Filter className="inline h-3 w-3 mr-1" />
          {lang === 'id' ? 'Semua' : 'All'} ({results.length})
        </button>
        {categories.map((c) => {
          const count = results.filter((r) => r.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`text-xs px-2 py-1 rounded border ${activeCat === c ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:bg-muted'}`}
            >
              {CATEGORY_LABEL[c][lang === 'en' ? 'en' : 'id']} ({count})
            </button>
          );
        })}
      </div>

      {query && paged.length === 0 && (
        <div className="card p-6 text-center text-muted-foreground">
          {lang === 'id' ? 'Tidak ada pasal cocok.' : 'No matching pasal.'}
        </div>
      )}

      <div className="grid gap-3">
        {paged.map((p) => (
          <div key={p.id} className="card p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold">
                  {p.uuShort} {lang === 'id' ? 'Pasal' : 'Article'} {p.pasal}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {CATEGORY_LABEL[p.category][lang === 'en' ? 'en' : 'id']} ·{' '}
                  {lang === 'id' ? 'Berlaku' : 'Effective'} {p.effective}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                score {p.score.toFixed(1)}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{p.text}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.keywords.map((k) => (
                <span key={k} className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                  {k}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length > paged.length && (
        <div className="text-center mt-4">
          <button className="btn text-sm" onClick={() => setPage((p) => p + 1)}>
            {lang === 'id' ? `Muat ${Math.min(PAGE_SIZE, filtered.length - paged.length)} lainnya` : `Load ${Math.min(PAGE_SIZE, filtered.length - paged.length)} more`}
          </button>
        </div>
      )}

      {!query && (
        <div className="card p-6 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <h3 className="font-semibold">{lang === 'id' ? 'UU yang tersedia' : 'Available UU'}</h3>
          </div>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>KUHP, KUHAP, UU Perkawinan, UU Ketenagakerjaan, UU Cipta Kerja</li>
            <li>UU Perlindungan Konsumen, UU Perseroan Terbatas, UU Hak Cipta, UU Merek</li>
            <li>UU Perlindungan Data Pribadi, UU ITE, UU Arbitrase</li>
          </ul>
        </div>
      )}
    </section>
  );
}