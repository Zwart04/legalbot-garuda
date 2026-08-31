'use client';

import Link from 'next/link';
import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { dict } from '@/lib/i18n';
import { Languages, Moon, Sun, Scale, LogIn, LogOut } from 'lucide-react';

export function Header() {
  const { mounted, user, lang, theme, setLang, setTheme, logout } = useApp();
  const { push } = useToast();
  const d = dict[lang === 'en' ? 'en' : 'id'];

  const navItems = [
    { href: '/dashboard', label: d.nav.dashboard },
    { href: '/lookup', label: d.nav.lookup },
    { href: '/browser', label: d.nav.browser },
    { href: '/caselaw', label: d.nav.caselaw },
    { href: '/template', label: d.nav.template },
    { href: '/history', label: d.nav.history },
    { href: '/dictionary', label: d.nav.dictionary },
    { href: '/finance', label: d.nav.finance },
    { href: '/analytics', label: d.nav.analytics },
  ];

  return (
    <header className="border-b border-border sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">{d.appName}</h1>
              <p className="text-xs text-muted-foreground">{d.tagline}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const next = lang === 'id' ? 'en' : 'id';
                setLang(next);
                push(next === 'id' ? 'Bahasa: Indonesia' : 'Language: English', 'info');
              }}
              className="flex items-center gap-1 text-xs border border-border rounded px-2 py-1 hover:bg-muted"
              aria-label="Toggle language"
            >
              <Languages className="h-3.5 w-3.5" />
              <span className="font-semibold">{lang === 'id' ? 'ID' : 'EN'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark';
                setTheme(next);
                push(next === 'dark' ? (lang === 'id' ? 'Mode gelap' : 'Dark mode') : (lang === 'id' ? 'Mode terang' : 'Light mode'), 'info');
              }}
              className="flex items-center justify-center h-7 w-7 border border-border rounded hover:bg-muted"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            {mounted && user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  push(lang === 'id' ? 'Berhasil keluar' : 'Logged out', 'success');
                }}
                className="flex items-center gap-1 text-xs border border-border rounded px-2 py-1 hover:bg-muted"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{user.name}</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-xs bg-emerald-600 text-white rounded px-3 py-1 hover:bg-emerald-700"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{d.nav.login}</span>
              </Link>
            )}
          </div>
        </div>
        <nav className="flex flex-wrap gap-1 text-xs">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3 py-1.5 rounded hover:bg-muted text-foreground/80 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}