"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import type { Language } from "@/lib/i18n";
import { getTranslation, type TranslationKeys } from "@/lib/i18n";

const STORAGE_LANG = "lawbot_lang";
const STORAGE_THEME = "lawbot_theme";
const STORAGE_SOURCE = "lawbot_source";

const DEFAULT_LANG: Language = "id";
const DEFAULT_THEME: "light" | "dark" = "light";

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  mounted: boolean;
  source: string | null;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANG);
  const [theme, setThemeState] = useState<"light" | "dark">(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const sourceRead = useRef(false);

  const setLang = useCallback((l: Language) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_LANG, l);
    setLangState(l);
  }, []);

  const setTheme = useCallback((t: "light" | "dark") => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_THEME, t);
    setThemeState(t);
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    if (!sourceRead.current && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source") ?? params.get("source");
      if (utmSource && utmSource.trim()) {
        const existing = localStorage.getItem(STORAGE_SOURCE);
        if (!existing) {
          localStorage.setItem(STORAGE_SOURCE, utmSource.trim());
        }
        setSource(utmSource.trim());
      } else {
        const stored = localStorage.getItem(STORAGE_SOURCE);
        if (stored) setSource(stored);
      }
      sourceRead.current = true;
    }

    const storedLang = localStorage.getItem(STORAGE_LANG) as Language | null;
    if (storedLang === "en" || storedLang === "id") {
      setLangState(storedLang);
      setLang(storedLang);
    }

    const storedTheme = localStorage.getItem(STORAGE_THEME) as "light" | "dark" | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
      setTheme(storedTheme);
    }
  }, [setLang, setTheme]);

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, mounted, source }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
