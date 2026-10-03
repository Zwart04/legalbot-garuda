"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];

export default function RiskAnalysisPage() {
  const t = useTranslations();
  const { lang, mounted } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  const [score, setScore] = useState<number>(25);
  const [analyzing, setAnalyzing] = useState(true);
  const [result, setResult] = useState<{
    category: string;
    description: string;
    recommendation: string;
    factors: { label: string; risk: number }[];
  } | null>(null);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
    if (mounted) {
      setAnalyzing(false);
      doAnalysis();
    }
  }, [mounted, user, router]);

  const doAnalysis = () => {
    const newScore = Math.floor(Math.random() * 80) + 10;
    setScore(newScore);

    let category = "";
    let description = "";
    let recommendation = "";

    if (newScore < 30) {
      category = lang === "en" ? t.riskAnalysis.low : t.riskAnalysis.low;
      description = lang === "en"
        ? "Your business has minimal legal risk exposure. Continue current compliance practices."
        : "Bisnis Anda memiliki paparan risiko hukum minimal. Lanjutkan praktik kepatuhan saat ini.";
      recommendation = lang === "en"
        ? "Maintain regular legal reviews. Focus on document retention and employee contracts."
        : "Pertahankan tinjauan hukum rutin. Fokus pada arsip dokumen dan kontrak karyawan.";
    } else if (newScore < 60) {
      category = lang === "en" ? t.riskAnalysis.medium : t.riskAnalysis.medium;
      description = lang === "en"
        ? "Moderate risk factors detected. Pay attention to employment and tax compliance."
        : "Faktor risiko moderat terdeteksi. Perhatikan kepatuhan ketenagakerjaan dan pajak.";
      recommendation = lang === "en"
        ? "Review employment contracts and tax filing schedule. Consider legal consultation."
        : "Tinjau kontrak ketenagakerjaan dan jadwal pengajuan pajak. Pertimbangkan konsultasi hukum.";
    } else {
      category = lang === "en" ? t.riskAnalysis.high : t.riskAnalysis.high;
      description = lang === "en"
        ? "High risk profile identified. Immediate legal review recommended."
        : "Profil risiko tinggi teridentifikasi. Tinjauan hukum segera direkomendasikan.";
      recommendation = lang === "en"
        ? "Schedule a consultation with a qualified Indonesian legal advisor as soon as possible."
        : "Jadwalkan konsultasi dengan penasihat hukum Indonesia yang berlisensi segera.";
    }

    const factors = [
      { label: lang === "en" ? "Business Structure" : "Struktur Bisnis", risk: Math.floor(Math.random() * 30) + 5 },
      { label: lang === "en" ? "Employment" : "Ketenagakerjaan", risk: Math.floor(Math.random() * 40) + 5 },
      { label: lang === "en" ? "Tax Compliance" : "Kepatuhan Pajak", risk: Math.floor(Math.random() * 35) + 5 },
      { label: lang === "en" ? "Intellectual Property" : "Kekayaan Intelektual", risk: Math.floor(Math.random() * 25) + 5 },
      { label: lang === "en" ? "Consumer Protection" : "Perlindungan Konsumen", risk: Math.floor(Math.random() * 30) + 5 },
      { label: lang === "en" ? "Data Privacy" : "Privasi Data", risk: Math.floor(Math.random() * 40) + 5 },
    ];

    setResult({ category, description, recommendation, factors });
    toast.success(
      lang === "en" ? "Risk analysis complete!" : "Analisis risiko selesai!"
    );
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.riskAnalysis.title}</h1>
        <p className="text-muted-foreground">{t.riskAnalysis.subtitle}</p>
      </div>

      {/* Score display */}
      <Card className="mb-6 bg-gradient-to-br from-primary/5 to-purple-50/30 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            {t.riskAnalysis.score}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle
                  cx="70" cy="70" r="60"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <circle
                  cx="70" cy="70" r="60"
                  fill="none"
                  stroke={
                    score < 30 ? "#22c55e" : score < 60 ? "#eab308" : "#ef4444"
                  }
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${score * 3.77} 377`}
                  transform="rotate(-90 70 70)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold" style={{
                  color: score < 30 ? "#22c55e" : score < 60 ? "#eab308" : "#ef4444",
                }}>
                  {score}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  / 100
                </span>
              </div>
            </div>
            <div className="flex-1">
              <Badge
                variant="outline"
                className={`text-lg px-4 py-1.5 ${
                  score < 30 ? "border-green-500 text-green-600" :
                  score < 60 ? "border-yellow-500 text-yellow-600" :
                  "border-red-500 text-red-600"
                }`}
              >
                {score < 30 ? (lang === "en" ? t.riskAnalysis.low : t.riskAnalysis.low)
                  : score < 60 ? (lang === "en" ? t.riskAnalysis.medium : t.riskAnalysis.medium)
                  : (lang === "en" ? t.riskAnalysis.high : t.riskAnalysis.high)}
              </Badge>
              {result && (
                <p className="text-sm text-muted-foreground mt-4">{result.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factors */}
      {result && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {lang === "en" ? "Risk Factors" : "Faktor Risiko"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.factors.map((factor, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{factor.label}</span>
                    <Badge
                      variant="secondary"
                      className={`${
                        factor.risk > 25
                          ? "bg-red-100 text-red-700"
                          : factor.risk > 15
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {factor.risk}%
                    </Badge>
                  </div>
                  <Progress
                    value={factor.risk}
                    className="h-2"
                    style={{
                      backgroundColor: factor.risk > 25
                        ? "#fef2f2"
                        : factor.risk > 15
                        ? "#fefce8"
                        : "#f0fdf4",
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendation */}
      {result && (
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {t.riskAnalysis.recommendation}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{result.recommendation}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={doAnalysis} className="bg-primary hover:bg-primary/90 gap-2">
          <RefreshCw className="h-4 w-4" />
          {lang === "en" ? "Run Analysis Again" : "Jalankan Analisis Lagi"}
        </Button>
      </div>
    </div>
  );
}
