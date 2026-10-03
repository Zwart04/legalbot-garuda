"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { useTranslations } from "@/lib/translations-context";
import { useAuth } from "@/lib/use-auth";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  FilePen,
  CheckSquare,
  ShieldAlert,
  BarChart3,
  Receipt,
  Settings,
  LogOut,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, key: "nav.dashboard" },
  { href: "/questionnaire", icon: ClipboardList, key: "nav.questionnaire" },
  { href: "/uu-database", icon: BookOpen, key: "nav.uuDatabase" },
  { href: "/template-generator", icon: FilePen, key: "nav.templateGenerator" },
  { href: "/compliance", icon: CheckSquare, key: "nav.compliance" },
  { href: "/risk-analysis", icon: ShieldAlert, key: "nav.riskAnalysis" },
  { href: "/analytics", icon: BarChart3, key: "nav.analytics" },
  { href: "/finance-journal", icon: Receipt, key: "nav.financeJournal" },
  { href: "/settings", icon: Settings, key: "nav.settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const { lang, setLang, theme, setTheme, mounted } = useApp();
  const { user, logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user && mounted) {
      router.push("/login");
    }
  }, [user, router, mounted]);

  useEffect(() => {
    if (user && mounted && pathname === "/login") {
      router.push("/dashboard");
    }
    if (user && mounted && pathname === "/register") {
      router.push("/dashboard");
    }
  }, [user, router, mounted, pathname]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "id" : "en");
  };

  const handleLogout = () => {
    logOut();
    router.push("/login");
  };

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse h-8 w-8 bg-primary rounded" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-lg">LawBot</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span suppressHydrationWarning>{t.nav[item.key as keyof typeof t.nav]}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t bg-card">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" suppressHydrationWarning>{user.name}</p>
              <p className="text-xs text-muted-foreground truncate" suppressHydrationWarning>{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="h-16 border-b bg-card px-4 flex items-center justify-between lg:justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLang}
              title={lang === "en" ? "Switch to Indonesian" : "Switch to English"}
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title={t.auth.logout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
