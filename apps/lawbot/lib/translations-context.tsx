"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Language } from "@/lib/i18n";
import { getTranslation, type TranslationKeys } from "@/lib/i18n";

interface TranslationsContextType {
  t: TranslationKeys;
  lang: Language;
}

const TranslationsContext = createContext<TranslationsContextType | null>(null);

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("id");
  const [t, setT] = useState<TranslationKeys>(() => getTranslation("id"));

  const update = useCallback((l: Language) => {
    setLang(l);
    setT(getTranslation(l));
  }, []);

  useEffect(() => {
    update("id");
  }, [update]);

  return (
    <TranslationsContext.Provider value={{ t, lang }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations(): TranslationKeys {
  const ctx = useContext(TranslationsContext);
  if (!ctx) throw new Error("useTranslations must be used within TranslationsProvider");
  return ctx.t;
}

export function useLanguage(): Language {
  const ctx = useContext(TranslationsContext);
  if (!ctx) throw new Error("useLanguage must be used within TranslationsProvider");
  return ctx.lang;
}
