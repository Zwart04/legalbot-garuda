"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, ClipboardList, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import type { Language } from "@/lib/i18n";

export default function QuestionnairePage() {
  const t = useTranslations();
  const { lang, mounted } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ score: number; analysis: string; rec: string } | null>(null);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  const questions = [
    {
      id: "businessType",
      text: lang === "en" ? "What type of business do you operate?" : "Apa jenis bisnis yang Anda jalankan?",
      options: lang === "en"
        ? ["Limited Liability Company (PT)", "Civil Partnership (CV)", "Sole Proprietorship", "Cooperative (Koperasi)", "Other"]
        : ["Perseroan Terbatas (PT)", "Commanditaire Vennootschap (CV)", "Usaha Perorangan", "Koperasi", "Lainnya"],
    },
    {
      id: "employees",
      text: lang === "en" ? "How many employees do you have?" : "Berapa jumlah karyawan Anda?",
      options: lang === "en"
        ? ["1 (Just me)", "2-5", "6-10", "11-50", "More than 50"]
        : ["1 (Hanya saya)", "2-5", "6-10", "11-50", "Lebih dari 50"],
    },
    {
      id: "revenue",
      text: lang === "en" ? "Approximate annual revenue?" : "Pendapatan tahunan perkiraan?",
      options: lang === "en"
        ? ["Less than Rp 500M", "Rp 500M - Rp 2.5B", "Rp 2.5B - Rp 50B", "Rp 50B - Rp 100B", "More than Rp 100B"]
        : ["Kurang dari Rp 500 Juta", "Rp 500 Juta - Rp 2,5 Miliar", "Rp 2,5 Miliar - Rp 50 Miliar", "Rp 50 Miliar - Rp 100 Miliar", "Lebih dari Rp 100 Miliar"],
    },
    {
      id: "sector",
      text: lang === "en" ? "Which sector does your business operate in?" : "Di sektor apa bisnis Anda beroperasi?",
      options: lang === "en"
        ? ["Retail / Trade", "Manufacturing / Industry", "Services / Consultant", "Food & Beverage", "Technology / IT", "Agriculture", "Construction", "Healthcare"]
        : ["Retail / Perdagangan", "Manufaktur / Industri", "Layanan / Konsultan", "Kedai Makan / Minuman", "Teknologi / IT", "Pertanian", "Konstruksi", "Kesehatan"],
    },
    {
      id: "legalIssues",
      text: lang === "en" ? "What legal issues are you currently facing?" : "Masalah hukum apa yang Anda hadapi?",
      options: lang === "en"
        ? ["Business registration", "Employment law", "Tax compliance", "Intellectual property", "Contracts & partnerships", "Consumer protection", "Data privacy", "Other"]
        : ["Pendaftaran usaha", "Hukum ketenagakerjaan", "Kepatuhan pajak", "Kekayaan intelektual", "Kontrak & kemitraan", "Perlindungan konsumen", "Privasi data", "Lainnya"],
    },
    {
      id: "experience",
      text: lang === "en" ? "Your experience with Indonesian business law?" : "Pengalaman Anda dengan hukum bisnis Indonesia?",
      options: lang === "en"
        ? ["Complete beginner", "Some knowledge", "Fairly experienced", "Very experienced"]
        : ["Pemula", "Sedikit tahu", "Cukup berpengalaman", "Sangat berpengalaman"],
    },
  ];

  const totalSteps = questions.length;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate risk score
    let score = 0;
    const weights: Record<string, number> = {
      businessType: 15,
      employees: 20,
      revenue: 25,
      sector: 15,
      legalIssues: 15,
      experience: 10,
    };

    Object.entries(answers).forEach(([key, val]) => {
      if (val && weights[key]) {
        const idx = parseInt(val.charAt(0));
        score += idx * weights[key];
      }
    });

    const normalizedScore = Math.min(100, Math.round((score / 100) * 100));

    let analysis = "";
    let recommendation = "";

    if (normalizedScore < 30) {
      analysis = lang === "en"
        ? "Your business has a low legal risk profile. Continue maintaining good compliance practices."
        : "Bisnis Anda memiliki profil risiko hukum rendah. Lanjutkan praktik kepatuhan yang baik.";
      recommendation = lang === "en"
        ? "Review legal requirements annually. Consider documenting all business agreements."
        : "Tinjau persyaratan hukum setiap tahun. Pertimbangkan mendokumentasikan semua perjanjian bisnis.";
    } else if (normalizedScore < 60) {
      analysis = lang === "en"
        ? "Moderate risk detected. Pay attention to employment law and tax compliance."
        : "Risiko moderat terdeteksi. Perhatikan hukum ketenagakerjaan dan kepatuhan pajak.";
      recommendation = lang === "en"
        ? "Consult with a legal professional for employment contracts and tax filing."
        : "Konsultasikan dengan profesional hukum untuk kontrak ketenagakerjaan dan pengajuan pajak.";
    } else {
      analysis = lang === "en"
        ? "High risk profile. Immediate attention to legal compliance needed."
        : "Profil risiko tinggi. Perhatian segera pada kepatuhan hukum diperlukan.";
      recommendation = lang === "en"
        ? "Schedule a consultation with a qualified Indonesian legal advisor immediately."
        : "Jadwalkan konsultasi dengan penasihat hukum Indonesia yang berpengalaman segera.";
    }

    setResults({ score: normalizedScore, analysis, rec: recommendation });
    setSubmitted(true);

    // Auto finance journal entry
    if (typeof window !== "undefined") {
      try {
        const journal = JSON.parse(localStorage.getItem("lawbot_journal") || "[]");
        journal.push({
          id: Date.now().toString(),
          description: lang === "en" ? "Risk Analysis" : "Analisis Risiko",
          amount: 0,
          category: "Analysis",
          date: new Date().toISOString(),
          source: "questionnaire",
        });
        localStorage.setItem("lawbot_journal", JSON.stringify(journal));
      } catch {}
    }

    toast.success(
      lang === "en" ? "Analysis complete!" : "Analisis selesai!",
      {
        duration: 3000,
      }
    );
  };

  const handleExportPDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(lang === "en" ? "Risk Analysis Report" : "Laporan Analisis Risiko", 20, 20);
    doc.setFontSize(12);
    doc.text(lang === "en" ? `Risk Score: ${results.score}/100` : `Skor Risiko: ${results.score}/100`, 20, 35);
    doc.text(lang === "en" ? "Analysis:" : "Analisis:", 20, 50);
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(results.analysis, 170);
    doc.text(lines, 20, 58);
    doc.text(lang === "en" ? "Recommendation:" : "Rekomendasi:", 20, 75);
    const lines2 = doc.splitTextToSize(results.rec, 170);
    doc.text(lines2, 20, 83);

    doc.save(lang === "en" ? "risk-analysis.pdf" : "analisis-risiko.pdf");

    toast.success(
      lang === "en" ? "PDF exported!" : "PDF diekspor!",
      { duration: 2000 }
    );

    // Finance journal entry
    if (typeof window !== "undefined") {
      try {
        const journal = JSON.parse(localStorage.getItem("lawbot_journal") || "[]");
        journal.push({
          id: Date.now().toString(),
          description: lang === "en" ? "PDF Export: Risk Analysis" : "Ekspor PDF: Analisis Risiko",
          amount: 0,
          category: "Export",
          date: new Date().toISOString(),
          source: "questionnaire",
        });
        localStorage.setItem("lawbot_journal", JSON.stringify(journal));
      } catch {}
    }
  };

  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / totalSteps) * 100;

  if (!mounted) return null;

  if (!submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{t.questionnaire.title}</h1>
          <p className="text-muted-foreground">{t.questionnaire.subtitle}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              {t.questionnaire.step.replace("{current}", String(currentStep + 1)).replace("{total}", String(totalSteps))}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {questions[currentStep]?.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[questions[currentStep]?.id || ""] || ""}
              onValueChange={(val) => handleAnswer(questions[currentStep]?.id || "", val)}
              className="space-y-3"
            >
              {questions[currentStep]?.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={opt} id={opt} />
                  <Label htmlFor={opt} className="flex-1 cursor-pointer">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.questionnaire.prev}
          </Button>

          {currentStep < totalSteps - 1 ? (
            <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90">
              {t.questionnaire.next}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="gap-2 bg-primary hover:bg-primary/90"
              disabled={totalAnswered < totalSteps}
            >
              <CheckCircle2 className="h-4 w-4" />
              {t.questionnaire.submit}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Results view
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.questionnaire.title}</h1>
        <p className="text-muted-foreground">{t.questionnaire.subtitle}</p>
      </div>

      {/* Score card */}
      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            {t.riskAnalysis.score}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                backgroundColor: results?.score ? (
                  results.score < 30 ? "#22c55e20" :
                  results.score < 60 ? "#eab30820" :
                  "#ef444420"
                ) : "#6366f120",
                color: results?.score ? (
                  results.score < 30 ? "#22c55e" :
                  results.score < 60 ? "#eab308" :
                  "#ef4444"
                ) : "#6366f1",
                border: results?.score ? (
                  results.score < 30 ? "2px solid #22c55e" :
                  results.score < 60 ? "2px solid #eab308" :
                  "2px solid #ef4444"
                ) : "2px solid #6366f1",
              }}
            >
              {results?.score}
            </div>
            <div className="flex-1">
              <p className="font-semibold">
                {results?.score && results.score < 30 ? (lang === "en" ? t.riskAnalysis.low : t.riskAnalysis.low)
                  : results?.score && results.score < 60 ? (lang === "en" ? t.riskAnalysis.medium : t.riskAnalysis.medium)
                    : (lang === "en" ? t.riskAnalysis.high : t.riskAnalysis.high)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "en" ? `/100 — Lower is better` : `/100 — Semakin rendah semakin baik`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">{t.riskAnalysis.analysis}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{results?.analysis}</p>
        </CardContent>
      </Card>

      {/* Recommendation */}
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
          <p className="text-muted-foreground">{results?.rec}</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button onClick={handleExportPDF} className="w-full bg-primary hover:bg-primary/90 gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {lang === "en" ? "Export as PDF" : "Ekspor sebagai PDF"}
        </Button>
        <Button variant="outline" onClick={() => { setSubmitted(false); setCurrentStep(0); setAnswers({}); }} className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {lang === "en" ? "Retake Questionnaire" : "Ulangi Kuesioner"}
        </Button>
      </div>
    </div>
  );
}
