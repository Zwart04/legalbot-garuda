"use client";

import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import {
  ClipboardList,
  FilePen,
  CheckSquare,
  ShieldAlert,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrendingUpDown } from "lucide-react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { useState, useEffect } from "react";
import Link from "next/link";



const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  delay: number;
}

function StatCard({ title, value, icon: Icon, color, delay }: StatCardProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`rounded-xl border bg-card p-5 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{title}</p>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations();
  const { mounted } = useApp();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    questions: 0,
    templates: 0,
    compliance: 0,
    risk: 0,
  });

  useEffect(() => {
    // Generate some demo stats
    setStats({
      questions: Math.floor(Math.random() * 50) + 10,
      templates: Math.floor(Math.random() * 20) + 3,
      compliance: Math.floor(Math.random() * 40) + 60,
      risk: Math.floor(Math.random() * 30) + 10,
    });
  }, []);

  const recentActivity = [
    { action: "Generated template: Surat Permohonan", time: "5 menit yang lalu", icon: FilePen, color: "#6366f1" },
    { action: "Menjawab kuesioner hukum", time: "15 menit yang lalu", icon: ClipboardList, color: "#8b5cf6" },
    { action: "Mengecek kepatuhan UU", time: "1 jam yang lalu", icon: CheckSquare, color: "#a855f7" },
    { action: "Analisis risiko bisnis", time: "2 jam yang lalu", icon: ShieldAlert, color: "#d946ef" },
    { action: "Mencari UU Persaingan Usaha", time: "3 jam yang lalu", icon: TrendingUp, color: "#ec4899" },
  ];

  const categoryData = [
    { name: "Pendaftaran Usaha", value: 12 },
    { name: "Hukum Ketenagakerjaan", value: 8 },
    { name: "Kepatuhan Pajak", value: 15 },
    { name: "Kekayaan Intelektual", value: 5 },
    { name: "Perlindungan Konsumen", value: 10 },
    { name: "Privasi Data", value: 7 },
  ];

  const sourceData = [
    { name: "Direct", value: 45 },
    { name: "Social Media", value: 25 },
    { name: "Referral", value: 15 },
    { name: "Search", value: 10 },
    { name: "Email", value: 5 },
  ];

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">
          Selamat datang, {user?.name}. Track aktivitas hukum bisnis Anda.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={t.dashboard.totalQuestions}
          value={stats.questions}
          icon={ClipboardList}
          color="#6366f1"
          delay={0}
        />
        <StatCard
          title={t.dashboard.templatesGenerated}
          value={stats.templates}
          icon={FilePen}
          color="#8b5cf6"
          delay={100}
        />
        <StatCard
          title={t.dashboard.complianceScore}
          value={`${stats.compliance}%`}
          icon={CheckSquare}
          color="#a855f7"
          delay={200}
        />
        <StatCard
          title={t.dashboard.riskScore}
          value={stats.risk}
          icon={ShieldAlert}
          color="#d946ef"
          delay={300}
        />
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pie chart - UU Categories */}
        <div className="rounded-xl border bg-card p-5 lg:col-span-1">
          <h3 className="font-semibold mb-4">{t.analytics.questionsByCategory}</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {categoryData.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart - Sources */}
        <div className="rounded-xl border bg-card p-5 lg:col-span-1">
          <h3 className="font-semibold mb-4">{t.analytics.sourceChart}</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card p-5 lg:col-span-1">
          <h3 className="font-semibold mb-4">{t.dashboard.recentActivity}</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t.dashboard.quickActions}</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/questionnaire">
            <Button className="bg-primary hover:bg-primary/90">
              <ClipboardList className="mr-2 h-4 w-4" />
              {t.nav.questionnaire}
            </Button>
          </Link>
          <Link href="/template-generator">
            <Button variant="outline">
              <FilePen className="mr-2 h-4 w-4" />
              {t.nav.templateGenerator}
            </Button>
          </Link>
          <Link href="/compliance">
            <Button variant="outline">
              <CheckSquare className="mr-2 h-4 w-4" />
              {t.nav.compliance}
            </Button>
          </Link>
          <Link href="/risk-analysis">
            <Button variant="outline">
              <ShieldAlert className="mr-2 h-4 w-4" />
              {t.nav.riskAnalysis}
            </Button>
          </Link>
          <Link href="/uu-database">
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              {t.nav.uuDatabase}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
