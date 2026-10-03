"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/lib/translations-context";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilePen, Download, Share2, Send, Check, Copy } from "lucide-react";
import { toast } from "react-hot-toast";

// Template names in both languages (inline, no type key issues)
const TEMPLATE_NAMES: Record<string, Record<string, string>> = {
  "surat-permohonan": {
    en: "Surat Permohonan",
    id: "Surat Permohonan",
  },
  "perjanjian-kerja": {
    en: "Perjanjian Kerja",
    id: "Perjanjian Kerja",
  },
  "kontrak-vendor": {
    en: "Kontrak Vendor",
    id: "Kontrak Vendor",
  },
  "surat-pemberitahuan": {
    en: "Surat Pemberitahuan",
    id: "Surat Pemberitahuan",
  },
  "izin-usaha": {
    en: "Permohonan Izin Usaha",
    id: "Permohonan Izin Usaha",
  },
};

interface Template {
  id: string;
  description: string;
  fields: { label: string; type: "text" | "textarea"; required: boolean; placeholder?: string }[];
}

const TEMPLATES: Template[] = [
  {
    id: "surat-permohonan",
    description: "Surat permohonan resmi untuk keperluan bisnis.",
    fields: [
      { label: "Kepada", type: "text", required: true, placeholder: "Yth. Bapak/Ibu ..." },
      { label: "Jabatan", type: "text", required: true, placeholder: "Kepala Dinas / Pejabat Berwenang" },
      { label: "Instansi", type: "text", required: true, placeholder: "Nama Instansi / Departemen" },
      { label: "Alamat", type: "textarea", required: true, placeholder: "Alamat lengkap instansi" },
      { label: "Perihal", type: "text", required: true, placeholder: "Perihal permohonan" },
      { label: "Isi Permohonan", type: "textarea", required: true, placeholder: "Jelaskan permohonan Anda secara detail..." },
    ],
  },
  {
    id: "perjanjian-kerja",
    description: "Perjanjian kerja antara employer dan employee.",
    fields: [
      { label: "Nama Employer", type: "text", required: true, placeholder: "Nama perusahaan / employer" },
      { label: "Nama Employee", type: "text", required: true, placeholder: "Nama pegawai / employee" },
      { label: "Jabatan", type: "text", required: true, placeholder: "Jabatan / posisi" },
      { label: "Gaji Pokok (Rp)", type: "text", required: true, placeholder: "Jumlah gaji pokok" },
      { label: "Masa Kerja", type: "text", required: true, placeholder: "Jangka waktu kerja (contoh: 1 tahun)" },
      { label: "Syarat-syarat", type: "textarea", required: false, placeholder: "Syarat dan ketentuan tambahan..." },
    ],
  },
  {
    id: "kontrak-vendor",
    description: "Kontrak layanan vendor / supplier.",
    fields: [
      { label: "Nama Vendor", type: "text", required: true, placeholder: "Nama vendor / supplier" },
      { label: "Jenis Layanan", type: "text", required: true, placeholder: "Jenis layanan yang diberikan" },
      { label: "Harga (Rp)", type: "text", required: true, placeholder: "Harga / biaya layanan" },
      { label: "Jangka Waktu", type: "text", required: true, placeholder: "Durasi kontrak" },
      { label: "Kewajiban Vendor", type: "textarea", required: true, placeholder: "Kewajiban vendor..." },
      { label: "Kewajiban Pembeli", type: "textarea", required: true, placeholder: "Kewajiban pembeli..." },
    ],
  },
  {
    id: "surat-pemberitahuan",
    description: "Surat pemberitahuan resmi untuk berbagai keperluan.",
    fields: [
      { label: "Kepada", type: "text", required: true, placeholder: "Yth. nama penerima" },
      { label: "Jabatan / Instansi", type: "text", required: false, placeholder: "Jabatan atau instansi" },
      { label: "Perihal", type: "text", required: true, placeholder: "Perihal surat" },
      { label: "Alasan Pemberitahuan", type: "textarea", required: true, placeholder: "Jelaskan alasan pemberitahuan..." },
      { label: "Tanggal Efektif", type: "text", required: true, placeholder: "Tanggal efektif (DD/MM/YYYY)" },
    ],
  },
  {
    id: "izin-usaha",
    description: "Permohonan izin usaha untuk perizinan bisnis.",
    fields: [
      { label: "Nama Pemohon / Perusahaan", type: "text", required: true, placeholder: "Nama pemohon atau perusahaan" },
      { label: "NIT / NIB", type: "text", required: true, placeholder: "Nomor Induk Tetap / Nomor Induk Berusaha" },
      { label: "Jenis Usaha", type: "text", required: true, placeholder: "Jenis usaha yang akan diizinkan" },
      { label: "Lokasi Usaha", type: "text", required: true, placeholder: "Alamat lokasi usaha" },
      { label: "Luas Area (m2)", type: "text", required: false, placeholder: "Luas area" },
      { label: "Alasan Permohonan", type: "textarea", required: true, placeholder: "Alasan permohonan izin..." },
    ],
  },
];

export default function TemplateGeneratorPage() {
  const t = useTranslations();
  const { lang, mounted } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  const template = TEMPLATES.find((t) => t.id === selectedTemplate);

  const getTemplateName = (id: string) => {
    const names = TEMPLATE_NAMES[id];
    return names ? (lang === "en" ? names.en : names.id) : id;
  };

  const handleFieldChange = (label: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleGenerate = () => {
    if (!template) {
      toast.error(t.templateGenerator.error);
      return;
    }

    const missingFields = template.fields.filter(
      (f) => f.required && !fieldValues[f.label]?.trim()
    );

    if (missingFields.length > 0) {
      toast.error(
        `${t.errors.somethingWentWrong} ${missingFields.map((f) => f.label).join(", ")}`
      );
      return;
    }

    setGenerating(true);

    // Build document
    let doc = "LAWBOT DOCUMENT GENERATOR\n";
    doc += `${lang === "en" ? "Generated:" : "Dihasilkan:"} ${new Date().toLocaleDateString("id-ID")}\n`;
    doc += "=".repeat(50) + "\n\n";
    doc += `${lang === "en" ? "Template:" : "Template:"} ${getTemplateName(template.id)}\n`;
    doc += `${lang === "en" ? "For:" : "Untuk:"} ${user?.name || "User"}\n\n`;
    doc += "-".repeat(50) + "\n\n";

    template.fields.forEach((field) => {
      const value = fieldValues[field.label] || "[Tidak diisi]";
      doc += `${field.label}:\n${value}\n\n`;
    });

    doc += "-".repeat(50) + "\n";
    doc += `${lang === "en" ? "Generated by LawBot — consult a lawyer for legal advice" : "Dihasilkan oleh LawBot — konsultasikan dengan pengacara untuk saran hukum"}\n`;

    // Download
    const blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);

    // Finance journal
    try {
      const journal = JSON.parse(localStorage.getItem("lawbot_journal") || "[]");
      journal.push({
        id: Date.now().toString(),
        description: `${lang === "en" ? "Template: " : "Template: "}${getTemplateName(template.id)}`,
        amount: 0,
        category: "Template",
        date: new Date().toISOString(),
        source: "template-generator",
      });
      localStorage.setItem("lawbot_journal", JSON.stringify(journal));
    } catch {}

    setGenerating(false);
    toast.success(t.templateGenerator.success);
  };

  const handleShare = async () => {
    const text = `${lang === "en" ? "My LawBot template:" : "Template LawBot saya:"} ${getTemplateName(selectedTemplate)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "LawBot Template", text });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success(lang === "en" ? "Copied to clipboard!" : "Disalin ke clipboard!");
      }
    } catch {
      toast.error(t.errors.somethingWentWrong);
    }
  };

  const handleWaShare = () => {
    const text = encodeURIComponent(
      `${lang === "en" ? "LawBot template:" : "Template LawBot:"} ${getTemplateName(selectedTemplate)}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t.templateGenerator.title}</h1>
        <p className="text-muted-foreground">{t.templateGenerator.subtitle}</p>
      </div>

      {/* Template picker */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FilePen className="h-4 w-4" />
            {t.templateGenerator.selectTemplate}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="grid gap-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => { setSelectedTemplate(tpl.id); setFieldValues({}); }}
                  className={`text-left p-3 rounded-lg border transition-colors w-full ${
                    selectedTemplate === tpl.id
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/20 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{getTemplateName(tpl.id)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{tpl.description}</p>
                    </div>
                    {selectedTemplate === tpl.id && (
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Form */}
      {template && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FilePen className="h-4 w-4" />
              {getTemplateName(template.id)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {template.fields.map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <Label htmlFor={field.label}>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {field.type === "text" ? (
                    <Input
                      id={field.label}
                      value={fieldValues[field.label] || ""}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Textarea
                      id={field.label}
                      value={fieldValues[field.label] || ""}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {template && (
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} disabled={generating} className="bg-primary hover:bg-primary/90 gap-2">
            {generating ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t.templateGenerator.downloading}
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                {t.templateGenerator.generate}
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            {lang === "en" ? "Share" : "Bagikan"}
          </Button>
          <Button variant="outline" onClick={handleWaShare} className="gap-2">
            <Send className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(window.location.href).then(() => {
              toast.success(lang === "en" ? "Copied!" : "Tersalin!");
            });
          }} className="gap-2">
            <Copy className="h-4 w-4" />
            {lang === "en" ? "Copy Link" : "Salin Link"}
          </Button>
        </div>
      )}
    </div>
  );
}
