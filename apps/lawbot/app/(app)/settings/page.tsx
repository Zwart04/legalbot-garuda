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
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings as SettingsIcon, Globe, Sun, Moon, Info, Hash, Check, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const t = useTranslations();
  const { lang, setLang, theme, setTheme, mounted } = useApp();
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [demoAccounts, setDemoAccounts] = useState<any[]>([]);
  const [filterLang, setFilterLang] = useState("all");

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
    try {
      const saved = localStorage.getItem("hf_users") || "[]";
      setDemoAccounts(JSON.parse(saved));
    } catch {
      setDemoAccounts([]);
    }
  }, [mounted, user, router]);

  const handleResetDemo = () => {
    if (confirm(lang === "en" ? "Reset all demo accounts?" : "Reset semua akun demo?")) {
      const defaultUsers = [
        { id: "demo-admin", email: "admin@lawbot.id", name: "Admin LawBot", password: "admin123", createdAt: new Date().toISOString() },
      ];
      localStorage.setItem("hf_users", JSON.stringify(defaultUsers));
      setDemoAccounts(defaultUsers);
      toast.success(
        lang === "en" ? "Demo accounts reset!" : "Akun demo direset!"
      );
    }
  };

  const handleDeleteAccount = (id: string, email: string) => {
    if (id === "demo-admin") {
      toast.error(lang === "en" ? "Cannot delete default admin account" : "Tidak dapat menghapus akun admin default");
      return;
    }
    if (confirm(
      lang === "en"
        ? `Delete account ${email}? This cannot be undone.`
        : `Hapus akun ${email}? Tindakan ini tidak dapat dibatalkan.`
    )) {
      const updated = demoAccounts.filter((a) => a.id !== id);
      localStorage.setItem("hf_users", JSON.stringify(updated));
      setDemoAccounts(updated);
      toast.success(
        lang === "en" ? "Account deleted" : "Akun dihapus"
      );
    }
  };

  const accountsToShow = filterLang === "all"
    ? demoAccounts
    : demoAccounts.filter((a) => a.email.toLowerCase().includes(filterLang === "id" ? ".id" : "."));

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.settings.title}</h1>
        <p className="text-muted-foreground">{t.settings.subtitle}</p>
      </div>

      <div className="space-y-6">
        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {t.settings.language}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{t.settings.bahasaIndonesia}</p>
                <p className="text-sm text-muted-foreground">Bahasa Indonesia</p>
              </div>
              <Switch
                checked={lang === "id"}
                onCheckedChange={() => setLang("id")}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{t.settings.english}</p>
                <p className="text-sm text-muted-foreground">English</p>
              </div>
              <Switch
                checked={lang === "en"}
                onCheckedChange={() => setLang("en")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              {t.settings.theme}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{t.settings.light}</p>
                <p className="text-sm text-muted-foreground">Terang</p>
              </div>
              <Switch
                checked={theme === "light"}
                onCheckedChange={() => setTheme("light")}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{t.settings.dark}</p>
                <p className="text-sm text-muted-foreground">Gelap</p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={() => setTheme("dark")}
              />
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              {t.settings.about}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>LawBot</strong> — AI Legal Assistant for UMKM Indonesia
            </p>
            <p>
              {t.settings.version}: 1.0.0
            </p>
            <p className="text-xs">
              Stack: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + Recharts
            </p>
            <p className="text-xs">
              <span className="text-primary">No third-party tracking.</span> Attribution via UTM + localStorage.
            </p>
          </CardContent>
        </Card>

        {/* Demo accounts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                {lang === "en" ? "Demo Accounts" : "Akun Demo"}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetDemo}
                className="gap-1 text-xs"
              >
                <Trash2 className="h-3 w-3" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <Select
                value={filterLang}
                onValueChange={(val) => setFilterLang(val as string)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="id">.id only</SelectItem>
                  <SelectItem value="com">.com only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {accountsToShow.map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
                  >
                    <div>
                      <p className="font-medium">{acc.name}</p>
                      <p className="text-xs text-muted-foreground">{acc.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs px-1.5 py-0.5 rounded bg-background border">
                        {acc.password}
                      </code>
                      {acc.id !== "demo-admin" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteAccount(acc.id, acc.email)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {accountsToShow.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {lang === "en" ? "No accounts found" : "Tidak ada akun"}
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Current user */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{lang === "en" ? "Current Session" : "Sesi Saat Ini"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{lang === "en" ? "Name" : "Nama"}</span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{lang === "en" ? "Email" : "Email"}</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{lang === "en" ? "Language" : "Bahasa"}</span>
                <span className="font-medium">{lang === "en" ? "English" : "Bahasa Indonesia"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{lang === "en" ? "Theme" : "Tema"}</span>
                <span className="font-medium">{theme === "light" ? (lang === "en" ? "Light" : "Terang") : (lang === "en" ? "Dark" : "Gelap")}</span>
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    logOut();
                    router.push("/login");
                  }}
                  className="gap-1"
                >
                  <SettingsIcon className="h-3 w-3" />
                  {t.auth.logout}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
