'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { dict } from '@/lib/i18n';
import { Scale, LogIn, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const { lang, login, register } = useApp();
  const { push } = useToast();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('demo@legalbot.id');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const d = dict[lang === 'en' ? 'en' : 'id'];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = mode === 'login' ? login(email, password) : register(email, name, password);
    if (r.ok) {
      push(
        mode === 'login'
          ? lang === 'id'
            ? `Masuk sebagai ${email}`
            : `Logged in as ${email}`
          : lang === 'id'
            ? `Akun ${email} dibuat`
            : `Account ${email} created`,
        'success'
      );
      router.push('/dashboard');
    } else {
      push(r.error || 'Error', 'error');
    }
  };

  return (
    <section className="max-w-md mx-auto mt-12">
      <div className="card p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-bold tracking-tight">{d.appName}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{d.tagline}</p>
        <div className="flex gap-2 border-b border-border">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-b-2 ${mode === 'login' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-muted-foreground'}`}
            onClick={() => setMode('login')}
          >
            <LogIn className="inline h-4 w-4 mr-1" />
            {d.nav.login}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-b-2 ${mode === 'register' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-muted-foreground'}`}
            onClick={() => setMode('register')}
          >
            <UserPlus className="inline h-4 w-4 mr-1" />
            {lang === 'id' ? 'Daftar' : 'Register'}
          </button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background"
              required
            />
          </div>
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium mb-1">
                {lang === 'id' ? 'Nama' : 'Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background"
              required
              minLength={4}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {mode === 'login' ? d.nav.login : lang === 'id' ? 'Daftar' : 'Register'}
          </button>
        </form>
        <p className="text-xs text-muted-foreground">
          {lang === 'id'
            ? 'Default akun demo sudah terisi. Klik Masuk untuk mencoba tanpa registrasi.'
            : 'Default demo account prefilled. Click Login to try without registering.'}
        </p>
        <p className="text-xs text-center">
          <Link href="/dashboard" className="text-emerald-600 hover:underline">
            {lang === 'id' ? 'Lewati ke Dasbor' : 'Skip to Dashboard'}
          </Link>
        </p>
      </div>
    </section>
  );
}