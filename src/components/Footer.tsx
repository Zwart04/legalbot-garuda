'use client';

import { useApp } from '@/lib/auth';
import { dict } from '@/lib/i18n';
import Link from 'next/link';

export function Footer() {
  const { lang } = useApp();
  const d = dict[lang === 'en' ? 'en' : 'id'];
  return (
    <footer className="border-t border-border mt-12 pt-6 pb-8 text-sm bg-muted/30">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row justify-between gap-3 items-start md:items-center">
        <p className="text-muted-foreground">{d.common.copyright}</p>
        <div className="flex gap-4 text-xs">
          <Link href="/analytics" className="text-muted-foreground hover:text-foreground">
            {d.nav.analytics}
          </Link>
          <a
            href="https://github.com/Zwart04/legalbot-garuda"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}