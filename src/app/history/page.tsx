'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { History, Trash2, Download, Star } from 'lucide-react';
import { saveAs } from 'file-saver';

interface HistItem {
  id: string;
  ts: string;
  query: string;
  type: 'lookup' | 'caselaw' | 'template';
  result: string;
  favorite?: boolean;
}

const TYPE_LABEL: Record<HistItem['type'], { id: string; en: string }> = {
  lookup: { id: 'Pasal', en: 'Pasal' },
  caselaw: { id: 'Putusan', en: 'Case' },
  template: { id: 'Template', en: 'Template' },
};

export default function HistoryPage() {
  const { lang } = useApp();
  const { push } = useToast();
  const [items, setItems] = useState<HistItem[]>([]);
  const [filter, setFilter] = useState<'all' | HistItem['type']>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('lg_history') || '[]';
      setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  const filtered = items
    .filter((i) => (filter === 'all' ? true : i.type === filter))
    .filter((i) => (search ? i.query.toLowerCase().includes(search.toLowerCase()) : true));

  const clearAll = () => {
    window.localStorage.setItem('lg_history', '[]');
    setItems([]);
    push(lang === 'id' ? 'Riset dibersihkan' : 'Research cleared', 'success');
  };

  const toggleFav = (id: string) => {
    const next = items.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i));
    setItems(next);
    window.localStorage.setItem('lg_history', JSON.stringify(next));
  };

  const exportPdf = () => {
    if (filtered.length === 0) {
      push(lang === 'id' ? 'Tidak ada data' : 'No data', 'warning');
      return;
    }
    const text = [
      `${lang === 'id' ? 'Ringkasan Riset LegalBot Garuda' : 'LegalBot Garuda Research Summary'}`,
      `${lang === 'id' ? 'Tanggal' : 'Date'}: ${new Date().toLocaleString()}`,
      `${lang === 'id' ? 'Total' : 'Total'}: ${filtered.length} ${lang === 'id' ? 'entri' : 'entries'}`,
      '',
      ...filtered.map((i) => `[${i.ts}] (${TYPE_LABEL[i.type][lang === 'en' ? 'en' : 'id']}) ${i.query} → ${i.result}`),
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `legalbot-research-${Date.now()}.txt`);
    push(lang === 'id' ? 'Ringkasan diunduh' : 'Summary downloaded', 'success');
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <History className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Riset & Riwayat' : 'Research History'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? 'Semua query pasal, putusan, dan template yang pernah Anda akses. Mark favorit, export TXT ringkasan.'
          : 'All pasal queries, rulings, and templates you have accessed. Mark favorites, export TXT summary.'}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'lookup', 'caselaw', 'template'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`text-xs px-3 py-1 rounded border ${filter === t ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:bg-muted'}`}
          >
            {t === 'all' ? (lang === 'id' ? 'Semua' : 'All') : TYPE_LABEL[t][lang === 'en' ? 'en' : 'id']} ({items.filter((i) => (t === 'all' ? true : i.type === t)).length})
          </button>
        ))}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === 'id' ? 'Cari di riset...' : 'Search in research...'}
          className="flex-1 min-w-[200px] border border-border rounded px-3 py-1 text-sm bg-background"
        />
        <button className="btn text-sm" onClick={exportPdf}>
          <Download className="inline h-3.5 w-3.5 mr-1" />
          {lang === 'id' ? 'Export TXT' : 'Export TXT'}
        </button>
        <button className="btn text-sm text-red-600" onClick={clearAll}>
          <Trash2 className="inline h-3.5 w-3.5 mr-1" />
          {lang === 'id' ? 'Hapus Semua' : 'Clear All'}
        </button>
      </div>

      <div className="space-y-2">
        {filtered.map((i) => (
          <div key={i.id} className="card p-3 flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                  {TYPE_LABEL[i.type][lang === 'en' ? 'en' : 'id']}
                </span>
                <span className="text-xs text-muted-foreground">{new Date(i.ts).toLocaleString()}</span>
              </div>
              <p className="font-medium text-sm">{i.query}</p>
              <p className="text-xs text-muted-foreground">→ {i.result}</p>
            </div>
            <button
              onClick={() => toggleFav(i.id)}
              className="text-amber-500 hover:text-amber-600"
              aria-label="Toggle favorite"
            >
              <Star className={`h-4 w-4 ${i.favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-6 text-center text-muted-foreground">
          {lang === 'id' ? 'Belum ada riset. Mulai dengan Cari Pasal atau Putusan.' : 'No research yet. Start with Pasal Lookup or Case Law.'}
        </div>
      )}
    </section>
  );
}