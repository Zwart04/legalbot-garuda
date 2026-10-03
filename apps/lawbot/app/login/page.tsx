"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { useTranslations } from "@/lib/translations-context";
import { useAuth } from "@/lib/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Mail, Lock, User } from "lucide-react";

export default function LoginPage() {
  const { mounted, lang } = useApp();
  const t = useTranslations();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mounted && lang === "id") {
      document.documentElement.lang = "id";
    }
  }, [mounted, lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError(t.errors.invalidEmail);
      return;
    }
    if (password.length < 6) {
      setError(t.errors.passwordTooShort);
      return;
    }

    setLoading(true);
    const user = login(email, password);
    setLoading(false);

    if (user) {
      router.push("/dashboard");
    } else {
      setError(t.errors.somethingWentWrong);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Scale className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>

        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">{t.auth.loginTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="mr-2 h-4 w-4" />
                  {t.auth.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@lawbot.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <Lock className="mr-2 h-4 w-4" />
                  {t.auth.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-10" disabled={loading}>
                {loading ? t.common.loading : t.auth.login}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t.auth.noAccount}{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                {t.auth.register}
              </Link>
            </div>

            {/* Demo account hint */}
            <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              Demo: admin@lawbot.id / admin123
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
