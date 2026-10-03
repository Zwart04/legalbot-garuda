"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Link2, ShieldAlert, ClipboardList, TrendingUp, FilePen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];

export default function AnalyticsPage() {
  const t = useTranslations();
  const { lang, source, mounted } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  const monthlyTemplates = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 25 },
    { month: "Apr", count: 22 },
    { month: "May", count: 30 },
    { month: "Jun", count: 28 },
    { month: "Jul", count: 35 },
    { month: "Aug", count: 40 },
  ];

  const categoryData = [
    { name: "Pajak", value: 35 },
    { name: "Ketenagakerjaan", value: 28 },
    { name: "Perizinan", value: 22 },
    { name: "Kekayaan Intelektual", value: 15 },
  ];

  const sourceData = [
    { name: "Direct", value: 42 },
    { name: "Social Media", value: 25 },
    { name: "Referral", value: 18 },
    { name: "Search", value: 10 },
    { name: "Email", value: 5 },
  ];

  const sourceAttr = source || "Direct";

  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.analytics.title}</h1>
        <p className="text-muted-foreground">{t.analytics.subtitle}</p>
      </div>

      {/* Source attribution */}
      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            {t.analytics.sourceChart}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {t.analytics.attributionNote}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie */}
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Source detail */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Link2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {lang === "en" ? "Your traffic source:" : "Sumber trafik Anda:"}
                  </p>
                  <p className="font-semibold text-lg">{sourceAttr}</p>
                </div>
              </div>
              <div className="space-y-2">
                {sourceData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Templates by month */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FilePen className="h-5 w-5 text-primary" />
              {t.analytics.templatesByMonth}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTemplates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} name="Templates" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* UU Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              {t.analytics.topCategories}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {categoryData.map((item, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-xs gap-1.5"
                  style={{
                    borderLeft: `3px solid ${COLORS[i % COLORS.length]}`,
                    backgroundColor: `${COLORS[i % COLORS.length]}10`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  {item.name} {item.value}%
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Questions answered */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              {t.analytics.questionsByCategory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: "Q1", value: 95 },
                  { name: "Q2", value: 88 },
                  { name: "Q3", value: 72 },
                  { name: "Q4", value: 65 },
                  { name: "Q5", value: 58 },
                  { name: "Q6", value: 42 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf620"
                    name="Questions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {t.analytics.totalSessions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t.dashboard.totalQuestions, value: "1,247", color: "#6366f1" },
                { label: t.dashboard.templatesGenerated, value: "523", color: "#8b5cf6" },
                { label: t.dashboard.complianceScore, value: "87%", color: "#a855f7" },
                { label: "Risk Analyses", value: "42", color: "#d946ef" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
