'use client';

import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { Wallet, TrendingUp, Download, Trash2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { saveAs } from 'file-saver';
import { formatIDR, formatDate } from '@/lib/utils';

interface FinItem {
  id: string;
  ts: string;
  amount: number;
  tag: string;
  desc: string;
}

const TAG_LABEL: Record<string, { id: string; en: string; color: string }> = {
  'auto-template': { id: 'Template', en: 'Template', color: '#10b981' },
  'auto-research': { id: 'Riset', en: 'Research', color: '#3b82f6' },
  'auto-export': { id: 'Export', en: 'Export', color: '#f59e0b' },
  'auto-lookup': { id: 'Cari Pasal', en: 'Pasal Lookup', color: '#8b5cf6' },
};

export default function FinancePage() {
  const { lang } = useApp();
  const { push } = useToast();
  const [items, setItems] = useState<FinItem[]>([]);
  const [filter, setFilter] = useState<'all' | string>('all');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('lg_finance') || '[]';
      setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  const filtered = filter === 'all' ? items : items.filter((i) => i.tag === filter);

  const total = filtered.reduce((s, i) => s + i.amount, 0);

  const chartData = useMemo(() => {
    const byDay: Record<string, number> = {};
    for (const i of filtered) {
      const d = new Date(i.ts).toISOString().slice(0, 10);
      byDay[d] = (byDay[d] || 0) + i.amount;
    }
    let cum = 0;
    return Object.entries(byDay)
      .sort()
      .map(([date, amount]) => {
        cum += amount;
        return { date, amount, cumulative: cum };
      });
  }, [filtered]);

  const exportCsv = () => {
    if (filtered.length === 0) {
      push(lang === 'id' ? 'Tidak ada data' : 'No data', 'warning');
      return;
    }
    const csv = [
      'id,date,amount,tag,description',
      ...filtered.map((i) => `${i.id},${i.ts},${i.amount},${i.tag},"${i.desc.replace(/"/g, '""')}"`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `legalbot-finance-${Date.now()}.csv`);
    push(lang === 'id' ? 'CSV diunduh' : 'CSV downloaded', 'success');
  };

  const clearAll = () => {
    window.localStorage.setItem('lg_finance', '[]');
    setItems([]);
    push(lang === 'id' ? 'Jurnal dibersihkan' : 'Journal cleared', 'success');
  };

  // Add synthetic seed entries if empty
  useEffect(() => {
    if (items.length === 0 && typeof window !== 'undefined') {
      const seed: FinItem[] = [
        { id: 's-1', ts: new Date().toISOString(), amount: 25000, tag: 'auto-template', desc: 'Generate Surat Kuasa' },
        { id: 's-2', ts: new Date().toISOString(), amount: 5000, tag: 'auto-lookup', desc: 'Pasal Lookup: pesangon' },
        { id: 's-3', ts: new Date().toISOString(), amount: 15000, tag: 'auto-research', desc: 'Case Law analysis' },
        { id: 's-4', ts: new Date().toISOString(), amount: 10000, tag: 'auto-export', desc: 'Download TXT contract' },
      ];
      window.localStorage.setItem('lg_finance', JSON.stringify(seed));
      setItems(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Jurnal Otomatis' : 'Auto Finance Journal'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? 'Setiap aksi (lookup pasal, generate template, download kontrak) otomatis tercatat dengan source_tag.'
          : 'Every action (pasal lookup, template generation, contract download) auto-logged with source_tag.'}
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-xs text-muted-foreground">{lang === 'id' ? 'Total Entri' : 'Total Entries'}</p>
          <p className="text-2xl font-bold">{filtered.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted-foreground">{lang === 'id' ? 'Total Akumulasi' : 'Cumulative Total'}</p>
          <p className="text-2xl font-bold">{formatIDR(total)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted-foreground">{lang === 'id' ? 'Rata-rata' : 'Average'}</p>
          <p className="text-2xl font-bold">{filtered.length > 0 ? formatIDR(Math.round(total / filtered.length)) : 'Rp 0'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {['all', ...Object.keys(TAG_LABEL)].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`text-xs px-3 py-1 rounded border ${filter === t ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:bg-muted'}`}
          >
            {t === 'all' ? (lang === 'id' ? 'Semua' : 'All') : (TAG_LABEL[t]?.[lang === 'en' ? 'en' : 'id'] || t)}
          </button>
        ))}
        <button className="btn text-sm ml-auto" onClick={exportCsv}>
          <Download className="inline h-3.5 w-3.5 mr-1" />
          CSV
        </button>
        <button className="btn text-sm text-red-600" onClick={clearAll}>
          <Trash2 className="inline h-3.5 w-3.5 mr-1" />
          {lang === 'id' ? 'Bersihkan' : 'Clear'}
        </button>
      </div>

      {chartData.length > 0 && (
        <div className="card p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <h3 className="font-semibold text-sm">
              {lang === 'id' ? 'Akumulasi per Hari' : 'Cumulative per Day'}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={10} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: number, k: string) =>
                  k === 'cumulative' ? formatIDR(v) : formatIDR(v)
                }
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#10b981"
                fill="url(#cgrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2">{lang === 'id' ? 'Tanggal' : 'Date'}</th>
              <th className="text-left p-2">{lang === 'id' ? 'Deskripsi' : 'Description'}</th>
              <th className="text-left p-2">Tag</th>
              <th className="text-right p-2">{lang === 'id' ? 'Jumlah' : 'Amount'}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className="border-t border-border">
                <td className="p-2 text-xs">{formatDate(i.ts)}</td>
                <td className="p-2">{i.desc}</td>
                <td className="p-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: TAG_LABEL[i.tag]?.color || '#888' }}
                  >
                    {TAG_LABEL[i.tag]?.[lang === 'en' ? 'en' : 'id'] || i.tag}
                  </span>
                </td>
                <td className="p-2 text-right font-medium">{formatIDR(i.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}