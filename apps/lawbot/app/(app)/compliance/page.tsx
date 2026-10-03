"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "1",
    title: "NIB (Nomor Induk Berusaha)",
    description: "Daftar sebagai pelaku usaha di OSS (Online Single Submission).",
    completed: false,
    category: "Pendaftaran",
  },
  {
    id: "2",
    title: "NPWP Badan / Orang Pribadi",
    description: "Mendaftar Nomor Pokok Wajib Pajak untuk keperluan perpajakan.",
    completed: false,
    category: "Pajak",
  },
  {
    id: "3",
    title: "AKTA Pendirian Perseroan",
    description: "Jika berbentuk PT, memiliki akta notaris yang sah.",
    completed: false,
    category: "Pendaftaran",
  },
  {
    id: "4",
    title: "Rekening Koran Bisnis",
    description: "Membuka rekening atas nama perusahaan untuk transaksi bisnis.",
    completed: false,
    category: "Keuangan",
  },
  {
    id: "5",
    title: "Perjanjian Kerja Pegawai",
    description: "Menyediakan kontrak kerja untuk setiap karyawan.",
    completed: false,
    category: "Ketenagakerjaan",
  },
  {
    id: "6",
    title: "Asuransi Ketenagakerjaan (BPJS Ketenagakerjaan)",
    description: "Mendaftarkan karyawan ke BPJS Ketenagakerjaan.",
    completed: false,
    category: "Ketenagakerjaan",
  },
  {
    id: "7",
    title: "BPJS Kesehatan Karyawan",
    description: "Mendaftarkan karyawan ke BPJS Kesehatan.",
    completed: false,
    category: "Ketenagakerjaan",
  },
  {
    id: "8",
    title: "IzIN Usaha (jika diperlukan)",
    description: "Mendapatkan izin khusus sesuai jenis usaha (menuangkan, pabrik, restoran, dll).",
    completed: false,
    category: "Perizinan",
  },
  {
    id: "9",
    title: "Pendaftaran Merek / HKI",
    description: "Melindungi merek, logo, atau desain produk melalui HKI.",
    completed: false,
    category: "Kekayaan Intelektual",
  },
  {
    id: "10",
    title: "Ketentuan Persaingan Usaha",
    description: "Memastikan praktik bisnis tidak melanggar UU Persaingan Usaha (anti-monopoli).",
    completed: false,
    category: "Persaingan Usaha",
  },
  {
    id: "11",
    title: "Syarat Perlindungan Konsumen",
    description: "Menyediakan informasi produk yang jelas dan mekanisme pengaduan.",
    completed: false,
    category: "Perlindungan Konsumen",
  },
  {
    id: "12",
    title: "Kepatuhan Pajak Tahunan",
    description: "Mengajukan SPT Tahunan pajak badan/perorangan tepat waktu.",
    completed: false,
    category: "Pajak",
  },
];

export default function CompliancePage() {
  const t = useTranslations();
  const { lang, mounted } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem("lawbot_checklist");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    // Default: mark first 3 as completed for demo
    const items = CHECKLIST_ITEMS.map((item, i) => ({
      ...item,
      completed: i < 3,
    }));
    return items;
  });

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
    // Save to localStorage
    localStorage.setItem("lawbot_checklist", JSON.stringify(items));
  }, [mounted, user, router, items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    toast.success(
      items.find((i) => i.id === id)?.completed
        ? (lang === "en" ? "Item unmarked" : "Item ditandai belum selesai")
        : (lang === "en" ? "Item completed!" : "Item selesai!")
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progress = (completedCount / items.length) * 100;

  const categories = Array.from(new Set(items.map((i) => i.category)));

  const filteredByCategory = (cat: string) => {
    if (cat === "all") return items;
    return items.filter((i) => i.category === cat);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.compliance.title}</h1>
        <p className="text-muted-foreground">{t.compliance.subtitle}</p>
      </div>

      {/* Progress card */}
      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {t.compliance.progress}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{items.length} {lang === "en" ? "items" : "item"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3 mb-2" />
          {progress === 100 ? (
            <p className="text-center text-sm text-primary font-medium py-2">
              <CheckCircle2 className="h-4 w-4 inline mr-1" />
              {t.compliance.allCompleted}
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {lang === "en"
                ? `${100 - progress}% remaining — keep going!`
                : `${Math.round(100 - progress)}% tersisa — tetap semangat!`}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...categories].map((cat) => (
          <Button
            key={cat}
            variant={cat === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setItems((prev) =>
              prev.map((i) => ({ ...i, completed: cat === "all" ? i.completed : i.category === cat && i.completed }))
            )}
            className={cat === "all" ? "bg-primary hover:bg-primary/90" : ""}
          >
            {cat === "all" ? t.uuDatabase.allCategories : cat}
          </Button>
        ))}
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {filteredByCategory("all").map((item) => (
          <Card
            key={item.id}
            className={`transition-all ${item.completed ? "opacity-60" : ""}`}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <Button
                variant={item.completed ? "default" : "outline"}
                size="icon"
                className={`mt-0.5 flex-shrink-0 ${item.completed ? "bg-primary hover:bg-primary/90" : ""}`}
                onClick={() => toggleItem(item.id)}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </Button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-medium text-sm ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                    {item.title}
                  </span>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reset */}
      <div className="mt-6 flex justify-end">
        <Button variant="outline" size="sm" onClick={() => {
          setItems(CHECKLIST_ITEMS.map((item, i) => ({ ...item, completed: i < 3 })));
          toast.success(lang === "en" ? "Checklist reset" : "Checklist direset");
        }}>
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          {lang === "en" ? "Reset Progress" : "Reset Kemajuan"}
        </Button>
      </div>
    </div>
  );
}
