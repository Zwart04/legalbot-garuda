"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Search, Clock, FileText, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UU_ARTICLES = [
  {
    id: "uu-ctk-2023",
    title: "Undang-Undang Cipta Kerja",
    year: 2023,
    category: "Perundangan Umum",
    summary: "UU yang mengubah kebijakan perizinan, ketenagakerjaan, dan perlindungan investor untuk mendorong pertumbuhan ekonomi.",
    articles: 132,
  },
  {
    id: "uu-itra-2024",
    title: "Undang-Undang Iritasi dan Tenaga Kerja",
    year: 2024,
    category: "Ketenagakerjaan",
    summary: "Regulasi terkait perlindungan pekerja, upah minimum, dan hubungan kerja.",
    articles: 89,
  },
  {
    id: "uu-pk-2024",
    title: "Undang-Undang Perlindungan Konsumen",
    year: 2024,
    category: "Perlindungan Konsumen",
    summary: "Hak dan kewajiban konsumen serta pelaku usaha dalam transaksi barang dan jasa.",
    articles: 56,
  },
  {
    id: "uu-ite-2024",
    title: "Undang-Undang ITE (Informasi dan Transaksi Elektronik)",
    year: 2024,
    category: "Teknologi Digital",
    summary: "Regulasi atas transaksi elektronik, keamanan siber, dan kejahatan siber di Indonesia.",
    articles: 112,
  },
  {
    id: "uu-psu-2023",
    title: "Undang-Undang Persaingan Usaha",
    year: 2023,
    category: "Persaingan Usaha",
    summary: "Regulasi anti-monopoli dan persaingan usaha tidak sehat untuk melindungi kepentingan umum.",
    articles: 78,
  },
  {
    id: "uu-hkti-2024",
    title: "Undang-Undang Hak Kekayaan Intelektual",
    year: 2024,
    category: "Kekayaan Intelektual",
    summary: "Proteksi atas hak cipta, paten, merek, desain industri, dan kekayaan intelektual lainnya.",
    articles: 95,
  },
  {
    id: "uu-tpf-2023",
    title: "Undang-Undang Transportasi Person dan Barang",
    year: 2023,
    category: "Transportasi",
    summary: "Regulasi transportasi person, angkutan umum, dan perdagangan internasional.",
    articles: 67,
  },
  {
    id: "uu-perbankan-2023",
    title: "Undang-Undang Perbankan",
    year: 2023,
    category: "Keuangan",
    summary: "Regulasi lembaga keuangan, sistem pembayaran, dan stabilitas keuangan nasional.",
    articles: 104,
  },
];

export default function UUDatabasePage() {
  const t = useTranslations();
  const { lang, mounted } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const handleCategoryChange = (val: string) => {
    setCategory(val);
  };
  const [selectedArticle, setSelectedArticle] = useState<typeof UU_ARTICLES[0] | null>(null);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  const categories = useMemo(() => {
    const cats = [...new Set(UU_ARTICLES.map((a) => a.category))];
    return ["all", ...cats];
  }, []);

  const filtered = useMemo(() => {
    let result = UU_ARTICLES;
    if (category !== "all") {
      result = result.filter((a) => a.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, category]);

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      "Perundangan Umum": "bg-blue-100 text-blue-700",
      "Ketenagakerjaan": "bg-green-100 text-green-700",
      "Perlindungan Konsumen": "bg-purple-100 text-purple-700",
      "Teknologi Digital": "bg-cyan-100 text-cyan-700",
      "Persaingan Usaha": "bg-orange-100 text-orange-700",
      "Kekayaan Intelektual": "bg-pink-100 text-pink-700",
      "Transportasi": "bg-yellow-100 text-yellow-700",
      "Keuangan": "bg-indigo-100 text-indigo-700",
    };
    return colors[cat] || "bg-gray-100 text-gray-700";
  };

  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.uuDatabase.title}</h1>
        <p className="text-muted-foreground">{t.uuDatabase.subtitle}</p>
      </div>

      {/* Search & Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.uuDatabase.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={category} onValueChange={(val) => setCategory(val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.uuDatabase.allCategories} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.uuDatabase.allCategories}</SelectItem>
                  {categories.filter((c) => c !== "all").map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {lang === "en" ? "No laws found matching your search." : "Tidak ada undang-undang yang cocok dengan pencarian Anda."}
            </div>
          ) : (
            filtered.map((article) => (
              <Card
                key={article.id}
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setSelectedArticle(selectedArticle?.id === article.id ? null : article)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{article.year}</span>
                      </div>
                      <CardTitle className="text-base font-semibold">{article.title}</CardTitle>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {article.articles} {t.uuDatabase.articles}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Detail modal */}
      {selectedArticle && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedArticle(null)}>
          <Card
            className="max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge className={getCategoryColor(selectedArticle.category)}>
                    {selectedArticle.category}
                  </Badge>
                  <CardTitle className="text-xl mt-2">{selectedArticle.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedArticle.year} — {selectedArticle.articles} {t.uuDatabase.articles}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedArticle(null)}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{selectedArticle.summary}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{t.uuDatabase.lastUpdated}: 2026-09-19</span>
              </div>
            </CardContent>
          </Card>
        </Card>
      )}
    </div>
  );
}
