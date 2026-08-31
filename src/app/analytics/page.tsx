'use client';

import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/lib/auth';
import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

interface AttrItem {
  source: string;
  ts: string;
}

const SOURCE_LABEL: Record<string, { id: string; en: string }> = {
  direct: { id: 'Langsung', en: 'Direct' },
  wa: { id: 'WhatsApp', en: 'WhatsApp' },
  ig: { id: 'Instagram', en: 'Instagram' },
  twitter: { id: 'Twitter/X', en: 'Twitter/X' },
  facebook: { id: 'Facebook', en: 'Facebook' },
  email: { id: 'Email', en: 'Email' },
  telegram: { id: 'Telegram', en: 'Telegram' },
  qr: { id: 'QR Code', en: 'QR Code' },
  other: { id: 'Lainnya', en: 'Other' },
};

export default function AnalyticsPage() {
  const { lang, source } = useApp();
  const [items, setItems] = useState<AttrItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('lg_attribution') || '[]';
      setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const i of items) {
      const s = SOURCE_LABEL[i.source] ? i.source : 'other';
      c[s] = (c[s] || 0) + 1;
    }
    return c;
  }, [items]);

  const chartData = Object.entries(counts).map(([k, v]) => ({
    name: SOURCE_LABEL[k]?.[lang === 'en' ? 'en' : 'id'] || k,
    value: v,
    key: k,
  }));

  const PIE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#64748b'];

  // Simulate visits for demo if empty
  useEffect(() => {
    if (items.length === 0 && typeof window !== 'undefined') {
      const seed: AttrItem[] = [
        { source: 'wa', ts: new Date().toISOString() },
        { source: 'wa', ts: new Date(Date.now() - 86400000).toISOString() },
        { source: 'ig', ts: new Date(Date.now() - 172800000).toISOString() },
        { source: 'direct', ts: new Date(Date.now() - 86400000).toISOString() },
        { source: 'twitter', ts: new Date(Date.now() - 259200000).toISOString() },
        { source: 'email', ts: new Date(Date.now() - 86400000).toISOString() },
        { source: 'wa', ts: new Date(Date.now() - 345600000).toISOString() },
        { source: 'ig', ts: new Date(Date.now() - 432000000).toISOString() },
      ];
      window.localStorage.setItem('lg_attribution', JSON.stringify(seed));
      setItems(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Analitik Sumber Trafik' : 'Source Attribution Analytics'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? 'UTM/URL-param ?utm_source=... → localStorage (first-visit persist). Tanpa Pixel/GA. Chart di bawah dari 100% localStorage.'
          : 'UTM/URL-param ?utm_source=... → localStorage (first-visit persist). Zero Pixel/GA. Chart below is 100% localStorage.'}
      </p>

      <div className="card p-4 mb-4 bg-emerald-50 dark:bg-emerald-950 border-emerald-200">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-emerald-700" />
          <h3 className="font-semibold text-sm text-emerald-900 dark:text-emerald-100">
            {lang === 'id' ? 'Sumber Pertama Anda' : 'Your First Source'}
          </h3>
        </div>
        <p className="text-2xl font-bold text-emerald-700">
          {source ? (SOURCE_LABEL[source]?.[lang === 'en' ? 'en' : 'id'] || source) : (lang === 'id' ? 'Belum ada' : 'None yet')}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {lang === 'id'
            ? 'Test: tambahkan ?utm_source=wa di URL atau klik link share wa.me.'
            : 'Test: append ?utm_source=wa to URL or click wa.me share link.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <h3 className="font-semibold text-sm">
              {lang === 'id' ? 'Bar Chart Sumber' : 'Source Bar Chart'}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold text-sm mb-3">
            {lang === 'id' ? 'Distribusi Sumber' : 'Source Distribution'}
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(d) => `${d.name}`}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2">{lang === 'id' ? 'Sumber' : 'Source'}</th>
              <th className="text-right p-2">{lang === 'id' ? 'Jumlah Kunjungan' : 'Visit Count'}</th>
              <th className="text-right p-2">{lang === 'id' ? 'Persentase' : 'Percentage'}</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((c) => (
              <tr key={c.key} className="border-t border-border">
                <td className="p-2">{c.name}</td>
                <td className="p-2 text-right font-medium">{c.value}</td>
                <td className="p-2 text-right text-muted-foreground">
                  {items.length > 0 ? `${((c.value / items.length) * 100).toFixed(1)}%` : '0%'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        {lang === 'id'
          ? 'Privasi: Semua data di perangkat Anda (localStorage). Tidak ada server, tidak ada third-party script.'
          : 'Privacy: All data on your device (localStorage). No server, no third-party script.'}
      </p>
    </section>
  );
}