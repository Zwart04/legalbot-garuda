"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Receipt, Plus, Trash2, Edit2, Save, X, TrendingUp } from "lucide-react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { id, enUS } from "date-fns/locale";

export default function FinanceJournalPage() {
  const t = useTranslations();
  const { lang, mounted } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  const [entries, setEntries] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newEntry, setNewEntry] = useState({ description: "", amount: "", category: "", date: "" });

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
    // Load journal
    try {
      const saved = localStorage.getItem("lawbot_journal") || "[]";
      setEntries(JSON.parse(saved));
    } catch {
      setEntries([]);
    }
  }, [mounted, user, router]);

  useEffect(() => {
    localStorage.setItem("lawbot_journal", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.description || !newEntry.category) {
      toast.error(t.errors.somethingWentWrong);
      return;
    }
    const entry = {
      id: Date.now().toString(),
      description: newEntry.description,
      amount: parseFloat(newEntry.amount) || 0,
      category: newEntry.category,
      date: newEntry.date || new Date().toISOString().split("T")[0],
      source: "manual",
    };
    setEntries((prev) => [entry, ...prev]);
    setNewEntry({ description: "", amount: "", category: "", date: "" });
    setShowAdd(false);
    toast.success(
      lang === "en" ? "Entry added!" : "Entri ditambahkan!"
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast.success(
      lang === "en" ? "Entry deleted" : "Entri dihapus"
    );
  };

  const startEdit = (entry: any) => {
    setEditingId(entry.id);
    setEditForm({ ...entry });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setEntries((prev) =>
      prev.map((e) =>
        e.id === editForm.id
          ? { ...e, description: editForm.description, amount: parseFloat(editForm.amount) || 0, category: editForm.category }
          : e
      )
    );
    setEditingId(null);
    setEditForm(null);
    toast.success(
      lang === "en" ? "Entry updated!" : "Entri diperbarui!"
    );
  };

  const totalAmount = entries.reduce((sum, e) => sum + (e.amount || 0), 0);

  const locale = lang === "en" ? enUS : id;

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{t.financeJournal.title}</h1>
          <p className="text-muted-foreground">{t.financeJournal.subtitle}</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          {t.financeJournal.addEntry}
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t.financeJournal.totalRecords}</p>
            <p className="text-2xl font-bold">{entries.length}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.financeJournal.totalAmount}</p>
                <p className="text-2xl font-bold">
                  {(lang === "en" ? "Rp " : "Rp ")}{totalAmount.toLocaleString("id-ID")}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add form */}
      {showAdd && (
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t.financeJournal.addEntry}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAdd(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-w-md">
              <div className="space-y-1.5">
                <Label>{t.financeJournal.description}</Label>
                <Input
                  value={newEntry.description}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder={lang === "en" ? "e.g. Tax payment" : "e.g. Pembayaran pajak"}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t.financeJournal.amount}</Label>
                  <Input
                    type="number"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.financeJournal.date}</Label>
                  <Input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>{t.financeJournal.category}</Label>
                <Select
                  value={newEntry.category}
                  onValueChange={(v) => setNewEntry((prev) => ({ ...prev, category: v || "" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.financeJournal.category} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">{lang === "en" ? "Income" : "Pemasukan"}</SelectItem>
                    <SelectItem value="Expense">{lang === "en" ? "Expense" : "Pengeluaran"}</SelectItem>
                    <SelectItem value="Template">{lang === "en" ? "Template" : "Template"}</SelectItem>
                    <SelectItem value="Analysis">{lang === "en" ? "Analysis" : "Analisis"}</SelectItem>
                    <SelectItem value="Export">{lang === "en" ? "Export" : "Ekspor"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={addEntry} className="bg-primary hover:bg-primary/90 flex-1 gap-2">
                  <Plus className="h-4 w-4" />
                  {t.common.save}
                </Button>
                <Button variant="outline" onClick={() => setShowAdd(false)}>
                  {t.common.cancel}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entries list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.financeJournal.entriesList}</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Receipt className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>{lang === "en" ? "No entries yet. Add your first entry above." : "Belum ada entri. Tambahkan entri pertama Anda di atas."}</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    {editingId === entry.id ? (
                      <>
                        <div className="flex-1 space-y-2">
                          <Input
                            value={editForm?.description || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev: { description?: string; amount?: string | number; category?: string }) => ({ ...prev, description: e.target.value }))}
                            className="h-8 text-sm"
                          />
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={editForm?.amount || 0}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm((prev: { description?: string; amount?: string | number; category?: string }) => ({ ...prev, amount: e.target.value }))}
                              className="h-8 text-sm flex-1"
                            />
                            <Select
                              value={editForm?.category || ""}
                              onValueChange={(v) => setEditForm((prev: { description?: string; amount?: string | number; category?: string }) => ({ ...prev, category: v || "" }))}
                            >
                              <SelectTrigger className="h-8 w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Income">Income</SelectItem>
                                <SelectItem value="Expense">Expense</SelectItem>
                                <SelectItem value="Template">Template</SelectItem>
                                <SelectItem value="Analysis">Analysis</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={saveEdit}>
                          <Save className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{entry.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span>{entry.category}</span>
                            <span>·</span>
                            <span>{format(new Date(entry.date), "dd/MM/yyyy", { locale })}</span>
                            {entry.source && (
                              <>
                                <span>·</span>
                                <span className="text-primary">{entry.source}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`font-semibold ${
                            (entry.amount || 0) >= 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {(entry.amount >= 0 ? "+" : "") +
                              (lang === "en" ? "Rp " : "Rp ") +
                              Math.abs(entry.amount || 0).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => startEdit(entry)}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => deleteEntry(entry.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
