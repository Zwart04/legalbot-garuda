'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/auth';
import { UU_LIST, CATEGORY_LABEL } from '@/data/corpus';
import { Library, ChevronDown, ChevronRight, Search } from 'lucide-react';

export default function BrowserPage() {
  const { lang } = useApp();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return UU_LIST;
    return UU_LIST.filter(
      (u) =>
        u.full.toLowerCase().includes(q) ||
        u.short.toLowerCase().includes(q) ||
        u.number.toLowerCase().includes(q) ||
        u.pasalList.some((p) => p.text.toLowerCase().includes(q) || p.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  }, [search]);

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Library className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Kamus UU' : 'UU Browser'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? '12 UU terstruktur dengan kategori dan pasal. Klik untuk expand.'
          : '12 structured UU with category and pasal. Click to expand.'}
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === 'id' ? 'Cari dalam UU...' : 'Search within UU...'}
          className="w-full border border-border rounded pl-10 pr-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((uu) => {
          const isOpen = expanded[uu.id] ?? false;
          return (
            <div key={uu.id} className="card overflow-hidden">
              <button
                onClick={() => toggle(uu.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 text-left"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{uu.short}</h3>
                    <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                      {CATEGORY_LABEL[uu.category][lang === 'en' ? 'en' : 'id']}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{uu.full}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {uu.pasalList.length} {lang === 'id' ? 'pasal' : 'articles'} ·{' '}
                    {lang === 'id' ? 'Berlaku' : 'Effective'} {uu.effective}
                  </p>
                </div>
                {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {isOpen && (
                <div className="border-t border-border divide-y divide-border">
                  {uu.pasalList.map((p) => (
                    <div key={p.id} className="p-4 hover:bg-muted/30">
                      <h4 className="font-medium text-sm mb-1">
                        {lang === 'id' ? 'Pasal' : 'Article'} {p.pasal}
                      </h4>
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
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-6 text-center text-muted-foreground">
          {lang === 'id' ? 'Tidak ada UU cocok.' : 'No matching UU.'}
        </div>
      )}
    </section>
  );
}