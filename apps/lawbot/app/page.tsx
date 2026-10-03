"use client";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { useTranslations } from "@/lib/translations-context";
import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  FilePen,
  BookOpen,
  ShieldAlert,
  BarChart3,
  Share2,
  ArrowRight,
  Scale,
  Sparkles,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ClipboardCheck,
    titleKey: "landing.features",
    desc: "Interactive multi-step questionnaire that adapts to your business profile and provides scenario-based legal guidance.",
  },
  {
    icon: BookOpen,
    titleKey: "landing.features",
    desc: "Searchable database of Indonesian laws (UU) relevant to UMKM, powered by TF-IDF relevance ranking.",
  },
  {
    icon: FilePen,
    titleKey: "landing.features",
    desc: "Generate professional legal documents (DOCX/PDF) from customizable templates — surat permohonan, perjanjian kerja, kontrak vendor.",
  },
  {
    icon: ShieldAlert,
    titleKey: "landing.features",
    desc: "Analyze your business risk profile based on questionnaire answers and receive actionable recommendations.",
  },
  {
    icon: BarChart3,
    titleKey: "landing.features",
    desc: "Track your LawBot usage with analytics charts, traffic source attribution, and auto finance journal.",
  },
  {
    icon: Share2,
    titleKey: "landing.features",
    desc: "Share results via wa.me deep-link, clipboard fallback, and in-app toast notifications. No third-party tracking.",
  },
];

export default function LandingPage() {
  const { mounted, setLang, lang } = useApp();
  const t = useTranslations();
  const [mountedState, setMountedState] = useState(false);

  useEffect(() => {
    setMountedState(true);
  }, []);

  if (!mountedState) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur h-16">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Scale className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">LawBot</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">{t.auth.login}</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90">{t.auth.register}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            {t.landing.heroTitle}
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            {t.landing.heroTitle}
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.landing.heroSubtitle}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                {t.landing.getStarted}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                {t.auth.login}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.landing.features}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to navigate Indonesian business law with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t.nav[["questionnaire", "uuDatabase", "templateGenerator", "riskAnalysis", "analytics", "compliance"][i] as keyof typeof t.nav]}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of UMKM owners who trust LawBot for their legal needs.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
              {t.landing.getStarted}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>LawBot — AI Legal Assistant for UMKM Indonesia</span>
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
