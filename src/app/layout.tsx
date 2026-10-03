import SuiteNav from "./suite-nav";
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LegalBot Garuda — AI Hukum Indonesia',
  description:
    'AI hukum Indonesia untuk UMKM & praktisi: pasal lookup + RAG-lite KUHP/UU + case-law similarity + auto-template kontrak (surat kuasa, somasi, NDA).',
  icons: { icon: '/icon.svg' },
};

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased"><SuiteNav />
        <Providers>
          <Header />
          <main className="max-w-7xl mx-auto p-4 pt-8 pb-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}