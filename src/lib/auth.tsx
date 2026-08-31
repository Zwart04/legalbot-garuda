import { createContext, useContext, useState, useEffect } from 'react';

export type AppUser = {
  email: string;
  name: string;
  createdAt: string;
};

const DEFAULT_USER: AppUser = {
  email: 'demo@legalbot.id',
  name: 'Demo User',
  createdAt: '2026-08-01T00:00:00.000Z',
};

function getStoredUsers(): AppUser[] {
  if (typeof window === 'undefined') return [DEFAULT_USER];
  try {
    const raw = window.localStorage.getItem('lg_users');
    if (!raw) return [DEFAULT_USER];
    const parsed = JSON.parse(raw) as AppUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [DEFAULT_USER];
    return parsed;
  } catch {
    return [DEFAULT_USER];
  }
}

function saveUsers(users: AppUser[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('lg_users', JSON.stringify(users));
}

function getCurrentUser(): AppUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem('lg_user');
    if (!raw) return null;
    return JSON.parse(raw) as AppUser;
  } catch {
    return null;
  }
}

function setCurrentUser(u: AppUser | null) {
  if (typeof window === 'undefined') return;
  if (!u) {
    window.localStorage.removeItem('lg_user');
    return;
  }
  window.localStorage.setItem('lg_user', JSON.stringify(u));
}

export interface AppContextValue {
  mounted: boolean;
  user: AppUser | null;
  lang: string;
  theme: 'light' | 'dark';
  setLang: (l: string) => void;
  setTheme: (t: 'light' | 'dark') => void;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (email: string, name: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  source: string;
}

const AppContext = createContext<AppContextValue | null>(null);

export { AppContext };

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<AppUser | null>(null);
  const [lang, setLangState] = useState<string>('id');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [source, setSource] = useState<string>('direct');

  useEffect(() => {
    setMounted(true);
    const u = getCurrentUser();
    if (u) setUser(u);
    const l = window.localStorage.getItem('lg_lang') as string | null;
    if (l === 'id' || l === 'en') setLangState(l);
    const t = window.localStorage.getItem('lg_theme');
    if (t === 'light' || t === 'dark') setThemeState(t);
    const params = new URLSearchParams(window.location.search);
    const utm = params.get('utm_source');
    if (utm) {
      window.localStorage.setItem('lg_source', utm);
      setSource(utm);
    } else {
      const stored = window.localStorage.getItem('lg_source');
      if (stored) setSource(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('lg_theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem('lg_lang', lang);
  }, [lang, mounted]);

  const login = (email: string, password: string) => {
    if (!email || !password) return { ok: false, error: 'Email & password wajib diisi' };
    if (!email.includes('@')) return { ok: false, error: 'Format email tidak valid' };
    if (password.length < 4) return { ok: false, error: 'Password minimal 4 karakter' };
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email);
    if (!found) {
      if (email === DEFAULT_USER.email) {
        const u: AppUser = { ...DEFAULT_USER, createdAt: new Date().toISOString() };
        saveUsers([u, ...users.filter((x) => x.email !== u.email)]);
        setCurrentUser(u);
        setUser(u);
        return { ok: true };
      }
      return { ok: false, error: 'Email belum terdaftar. Daftar dulu.' };
    }
    setCurrentUser(found);
    setUser(found);
    return { ok: true };
  };

  const register = (email: string, name: string, password: string) => {
    if (!email || !name || !password) return { ok: false, error: 'Semua field wajib diisi' };
    if (!email.includes('@')) return { ok: false, error: 'Format email tidak valid' };
    if (password.length < 4) return { ok: false, error: 'Password minimal 4 karakter' };
    const users = getStoredUsers();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'Email sudah terdaftar' };
    }
    const u: AppUser = { email, name, createdAt: new Date().toISOString() };
    saveUsers([u, ...users]);
    setCurrentUser(u);
    setUser(u);
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  const value: AppContextValue = {
    mounted,
    user,
    lang,
    theme,
    source,
    setLang: setLangState,
    setTheme: setThemeState,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}