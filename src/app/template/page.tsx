'use client';

import { useState } from 'react';
import { useApp } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { FileText, Download, Share2 } from 'lucide-react';
import { saveAs } from 'file-saver';

interface TemplateDef {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  fields: Array<{ key: string; labelId: string; labelEn: string; type: 'text' | 'date' | 'number' | 'long' }>;
  bodyId: string;
  bodyEn: string;
}

const TEMPLATES: TemplateDef[] = [
  {
    id: 'surat-kuasa',
    nameId: 'Surat Kuasa',
    nameEn: 'Power of Attorney',
    descId: 'Kuasa khusus untuk perkara perdata / pidana',
    descEn: 'Special power of attorney for civil/criminal case',
    fields: [
      { key: 'pemberi', labelId: 'Nama Pemberi Kuasa', labelEn: 'Grantor Name', type: 'text' },
      { key: 'penerima', labelId: 'Nama Penerima Kuasa', labelEn: 'Attorney Name', type: 'text' },
      { key: 'konteks', labelId: 'Konteks Kuasa', labelEn: 'Power Context', type: 'long' },
      { key: 'tanggal', labelId: 'Tanggal', labelEn: 'Date', type: 'date' },
    ],
    bodyId: `SURAT KUASA

Yang bertanda tangan di bawah ini:
Nama    : {pemberi}
Selanjutnya disebut "Pemberi Kuasa"

Dengan ini memberikan kuasa kepada:
Nama    : {penerima}
Selanjutnya disebut "Penerima Kuasa"

KHUSUS UNTUK: {konteks}

Penerima Kuasa berhak melakukan segala tindakan hukum yang sah terkait hal tersebut di atas, termasuk namun tidak terbatas pada mengajukan gugatan, hadir di persidangan, menandatangani dokumen, dan menerima putusan.

Surat kuasa ini tidak dapat dibatalkan secara sepihak dan hanya berakhir setelah tujuan kuasa tercapai.

Dibuat di Jakarta, {tanggal}

Pemberi Kuasa,             Penerima Kuasa,

[ttd {pemberi}]            [ttd {penerima}]`,
    bodyEn: `POWER OF ATTORNEY

The undersigned:
Name: {grantor}
Hereinafter referred to as "Grantor"

Hereby grants power to:
Name: {attorney}
Hereinafter referred to as "Attorney"

SPECIFICALLY FOR: {context}

The Attorney has the right to perform all legal actions related to the above, including but not limited to filing lawsuits, attending hearings, signing documents, and receiving rulings.

This power of attorney cannot be unilaterally revoked and only terminates after the purpose is achieved.

Made in Jakarta, {date}

Grantor,                       Attorney,

[signed {grantor}]            [signed {attorney}]`,
  },
  {
    id: 'somasi',
    nameId: 'Somasi',
    nameEn: 'Formal Notice',
    descId: 'Peringatan hukum sebelum litigasi',
    descEn: 'Legal warning before litigation',
    fields: [
      { key: 'pengirim', labelId: 'Nama Pengirim', labelEn: 'Sender Name', type: 'text' },
      { key: 'penerima', labelId: 'Nama Penerima', labelEn: 'Recipient Name', type: 'text' },
      { key: 'masalah', labelId: 'Permasalahan', labelEn: 'Issue', type: 'long' },
      { key: 'tuntutan', labelId: 'Tuntutan', labelEn: 'Demand', type: 'long' },
      { key: 'batas', labelId: 'Batas Waktu (hari)', labelEn: 'Deadline (days)', type: 'number' },
    ],
    bodyId: `SOMASI

Kepada Yth: {penerima}
Dengan hormat,

Perihal: {masalah}

Dengan ini kami {pengirim} memberitahukan bahwa:

{masalah}

Kami menuntut agar saudara:
{tuntutan}

Apabila dalam {batas} hari kalender somasi ini tidak ditindaklanjuti, kami akan mengambil langkah hukum melalui pengadilan.

Demikian somasi ini kami sampaikan untuk menjadi perhatian.

Hormat kami,

[ttd {pengirim}]`,
    bodyEn: `FORMAL NOTICE

To: {recipient}
Dear Sir/Madam,

Re: {issue}

We hereby {sender} notify that:

{issue}

We demand that you:
{demand}

If within {deadline} calendar days this notice is not followed up, we will take legal action through the courts.

This notice is conveyed for your attention.

Sincerely,

[signed {sender}]`,
  },
  {
    id: 'nda',
    nameId: 'Perjanjian Kerahasiaan (NDA)',
    nameEn: 'Non-Disclosure Agreement',
    descId: 'NDA dua pihak',
    descEn: 'Bilateral NDA',
    fields: [
      { key: 'pihakA', labelId: 'Pihak A', labelEn: 'Party A', type: 'text' },
      { key: 'pihakB', labelId: 'Pihak B', labelEn: 'Party B', type: 'text' },
      { key: 'rahasia', labelId: 'Informasi Rahasia', labelEn: 'Confidential Info', type: 'long' },
      { key: 'durasi', labelId: 'Durasi (tahun)', labelEn: 'Duration (years)', type: 'number' },
      { key: 'tanggal', labelId: 'Tanggal', labelEn: 'Date', type: 'date' },
    ],
    bodyId: `PERJANJIAN KERAHASIAAN

Antara {pihakA} ("Pihak A") dan {pihakB} ("Pihak B")

PIHAK-PIHAK sepakat:

1. INFORMASI RAHASIA: {rahasia}

2. DURASI: Kewajiban kerahasiaan berlaku selama {durasi} tahun sejak tanggal perjanjian.

3. LARANGAN: Kedua pihak dilarang mengungkapkan informasi rahasia kepada pihak ketiga tanpa persetujuan tertulis.

4. SANKSI: Pelanggaran dikenai ganti rugi minimal Rp 500.000.000,- (lima ratus juta rupiah).

5. YURISDIKSI: Pengadilan Negeri Jakarta Pusat.

Tanggal: {tanggal}

Pihak A,                    Pihak B,

[ttd {pihakA}]              [ttd {pihakB}]`,
    bodyEn: `NON-DISCLOSURE AGREEMENT

Between {partyA} ("Party A") and {partyB} ("Party B")

THE PARTIES agree:

1. CONFIDENTIAL INFORMATION: {confidential}

2. DURATION: Confidentiality obligations apply for {duration} years from the date of this agreement.

3. PROHIBITION: Both parties are prohibited from disclosing confidential information to third parties without written consent.

4. PENALTY: Violation subject to minimum IDR 500,000,000 (five hundred million rupiah) damages.

5. JURISDICTION: Central Jakarta District Court.

Date: {date}

Party A,                     Party B,

[signed {partyA}]           [signed {partyB}]`,
  },
  {
    id: 'mou',
    nameId: 'Memorandum of Understanding (MoU)',
    nameEn: 'Memorandum of Understanding (MoU)',
    descId: 'Nota kesepahaman kerja sama',
    descEn: 'Cooperation understanding',
    fields: [
      { key: 'pihakA', labelId: 'Pihak A', labelEn: 'Party A', type: 'text' },
      { key: 'pihakB', labelId: 'Pihak B', labelEn: 'Party B', type: 'text' },
      { key: 'kerjasama', labelId: 'Ruang Lingkup Kerja Sama', labelEn: 'Cooperation Scope', type: 'long' },
      { key: 'mulai', labelId: 'Tanggal Mulai', labelEn: 'Start Date', type: 'date' },
      { key: 'selesai', labelId: 'Tanggal Selesai', labelEn: 'End Date', type: 'date' },
    ],
    bodyId: `MOU

Antara {pihakA} ("Pihak I") dan {pihakB} ("Pihak II")

Pasal 1 - RUANG LINGKUP
{kerjasama}

Pasal 2 - JANGKA WAKTU
Mulai: {mulai}
Selesai: {selesai}

Pasal 3 - KERAHASIAAN
Kedua pihak wajib menjaga kerahasiaan informasi yang dipertukarkan.

Pasal 4 - PENYELESAIAN SENGKETA
Diselesaikan secara musyawarah, kemudian arbitrase di BANI.

Pihak I,                    Pihak II,

[ttd {pihakA}]              [ttd {pihakB}]`,
    bodyEn: `MOU

Between {partyA} ("Party I") and {partyB} ("Party II")

Article 1 - SCOPE
{cooperation}

Article 2 - DURATION
Start: {start}
End: {end}

Article 3 - CONFIDENTIALITY
Both parties shall maintain confidentiality of exchanged information.

Article 4 - DISPUTE RESOLUTION
Resolved amicably, then through BANI arbitration.

Party I,                     Party II,

[signed {partyA}]           [signed {partyB}]`,
  },
  {
    id: 'tos',
    nameId: 'Syarat & Ketentuan Layanan',
    nameEn: 'Terms of Service',
    descId: 'Syarat penggunaan platform digital',
    descEn: 'Digital platform usage terms',
    fields: [
      { key: 'platform', labelId: 'Nama Platform', labelEn: 'Platform Name', type: 'text' },
      { key: 'pemilik', labelId: 'Nama Pemilik/Persan', labelEn: 'Owner/Company', type: 'text' },
      { key: 'layanan', labelId: 'Deskripsi Layanan', labelEn: 'Service Description', type: 'long' },
      { key: 'tanggal', labelId: 'Tanggal Efektif', labelEn: 'Effective Date', type: 'date' },
    ],
    bodyId: `SYARAT & KETENTUAN {platform}

Pemilik: {pemilik}
Tanggal Efektif: {tanggal}

1. LAYANAN: {layanan}

2. PENGGUNA: Pengguna wajib memberikan data benar dan menjaga kerahasiaan akun.

3. LARANGAN: Dilarang keras menggunakan layanan untuk aktivitas ilegal, penipuan, atau pelanggaran hukum.

4. PEMBATALAN: Pemilik berhak menghentikan layanan tanpa pemberitahuan sebelumnya untuk pelanggaran berat.

5. PERUBAHAN: S&K dapat diperbarui sewaktu-waktu dengan pemberitahuan 7 hari sebelumnya.

6. HUKUM YANG BERLAKU: Hukum Republik Indonesia.`,
    bodyEn: `TERMS OF SERVICE {platform}

Owner: {owner}
Effective Date: {date}

1. SERVICE: {service}

2. USERS: Users must provide accurate data and maintain account confidentiality.

3. PROHIBITIONS: Strictly prohibited to use service for illegal activity, fraud, or law violations.

4. TERMINATION: Owner reserves the right to discontinue service without prior notice for serious violations.

5. CHANGES: ToS may be updated at any time with 7 days prior notice.

6. APPLICABLE LAW: Laws of the Republic of Indonesia.`,
  },
  {
    id: 'pkwt',
    nameId: 'Perjanjian Kerja Waktu Tertentu (PKWT)',
    nameEn: 'Fixed-Term Employment Contract',
    descId: 'Kontrak kerja PKWT sesuai UU 13/2003',
    descEn: 'PKWT contract per UU 13/2003',
    fields: [
      { key: 'perusahaan', labelId: 'Nama Perusahaan', labelEn: 'Company Name', type: 'text' },
      { key: 'karyawan', labelId: 'Nama Karyawan', labelEn: 'Employee Name', type: 'text' },
      { key: 'jabatan', labelId: 'Jabatan', labelEn: 'Position', type: 'text' },
      { key: 'gaji', labelId: 'Gaji Bulanan (IDR)', labelEn: 'Monthly Salary (IDR)', type: 'number' },
      { key: 'mulai', labelId: 'Tanggal Mulai', labelEn: 'Start Date', type: 'date' },
      { key: 'selesai', labelId: 'Tanggal Selesai', labelEn: 'End Date', type: 'date' },
    ],
    bodyId: `PKWT

Antara {perusahaan} ("Perusahaan") dan {karyawan} ("Karyawan")

Pasal 1 - JABATAN
Karyawan ditempatkan sebagai {jabatan}.

Pasal 2 - JANGKA WAKTU
Mulai: {mulai}
Selesai: {selesai}

Pasal 3 - KOMPENSASI
Gaji pokok: Rp {gaji} per bulan.
Tunjangan: sesuai peraturan Perusahaan.

Pasal 4 - JAM KERJA
40 jam/minggu sesuai UU 13/2003.

Pasal 5 - PESANGON
Jika PKWT tidak diperpanjang, pesangon sesuai Pasal 15 UU 13/2003 jo. UU Cipta Kerja.

Pasal 6 - KERAHASIAAN
Karyawan wajib menjaga rahasia Perusahaan.

Pasal 7 - PENYELESAIAN SENGKETA
Melalui bipartite, kemudian Pengadilan Hubungan Industrial.

Perusahaan,                  Karyawan,

[ttd {perusahaan}]          [ttd {karyawan}]`,
    bodyEn: `FIXED-TERM EMPLOYMENT CONTRACT

Between {company} ("Company") and {employee} ("Employee")

Article 1 - POSITION
Employee is assigned as {position}.

Article 2 - DURATION
Start: {start}
End: {end}

Article 3 - COMPENSATION
Base salary: IDR {salary} per month.
Benefits: per Company regulations.

Article 4 - WORKING HOURS
40 hours/week per UU 13/2003.

Article 5 - SEVERANCE
If PKWT not extended, severance per Article 15 UU 13/2003 jo. UU Cipta Kerja.

Article 6 - CONFIDENTIALITY
Employee must maintain Company secrets.

Article 7 - DISPUTE RESOLUTION
Through bipartite, then Industrial Relations Court.

Company,                     Employee,

[signed {company}]          [signed {employee}]`,
  },
];

export default function TemplatePage() {
  const { lang, user } = useApp();
  const { push } = useToast();
  const [selected, setSelected] = useState<TemplateDef>(TEMPLATES[0]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string>('');

  const generatePreview = () => {
    let body = lang === 'id' ? selected.bodyId : selected.bodyEn;
    for (const f of selected.fields) {
      const v = values[f.key] || `[${f.key}]`;
      body = body.split(`{${f.key}}`).join(v);
    }
    setPreview(body);
  };

  const exportTxt = () => {
    if (!preview) {
      push(lang === 'id' ? 'Generate preview dulu' : 'Generate preview first', 'warning');
      return;
    }
    const blob = new Blob([preview], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${selected.id}-${Date.now()}.txt`);
    try {
      const raw = window.localStorage.getItem('lg_finance') || '[]';
      const arr = JSON.parse(raw) as Array<{ id: string; ts: string; amount: number; tag: string; desc: string }>;
      arr.push({
        id: `f-${Date.now()}`,
        ts: new Date().toISOString(),
        amount: 25000,
        tag: 'auto-template',
        desc: `Export ${selected.nameEn}`,
      });
      window.localStorage.setItem('lg_finance', JSON.stringify(arr));
    } catch {}
    push(lang === 'id' ? `${selected.nameId} diunduh` : `${selected.nameEn} downloaded`, 'success');
  };

  const shareWa = () => {
    if (!preview) {
      push(lang === 'id' ? 'Generate preview dulu' : 'Generate preview first', 'warning');
      return;
    }
    const url = `https://wa.me/?text=${encodeURIComponent(preview.slice(0, 500))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    push(lang === 'id' ? 'Membuka WhatsApp compose' : 'Opening WhatsApp compose', 'info');
  };

  const loadTemplate = (t: TemplateDef) => {
    setSelected(t);
    setValues({});
    setPreview('');
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Template Kontrak' : 'Contract Templates'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? '6 template kontrak Indonesia dengan auto-fill. Output TXT siap download atau share via WhatsApp.'
          : '6 Indonesian contract templates with auto-fill. Output TXT ready to download or share via WhatsApp.'}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => loadTemplate(t)}
              className={`card p-3 w-full text-left ${selected.id === t.id ? 'ring-2 ring-emerald-500' : ''}`}
            >
              <h3 className="font-semibold text-sm">{lang === 'id' ? t.nameId : t.nameEn}</h3>
              <p className="text-xs text-muted-foreground mt-1">{lang === 'id' ? t.descId : t.descEn}</p>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold mb-3">
              {lang === 'id' ? 'Formulir' : 'Form'} — {lang === 'id' ? selected.nameId : selected.nameEn}
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {selected.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-medium mb-1">
                    {lang === 'id' ? f.labelId : f.labelEn}
                  </label>
                  {f.type === 'long' ? (
                    <textarea
                      rows={3}
                      value={values[f.key] || ''}
                      onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                      className="w-full border border-border rounded px-2 py-1 text-sm bg-background"
                    />
                  ) : (
                    <input
                      type={f.type}
                      value={values[f.key] || ''}
                      onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                      className="w-full border border-border rounded px-2 py-1 text-sm bg-background"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="btn btn-primary text-sm" onClick={generatePreview}>
                {lang === 'id' ? 'Generate Preview' : 'Generate Preview'}
              </button>
              <button className="btn text-sm" onClick={exportTxt}>
                <Download className="inline h-3.5 w-3.5 mr-1" />
                {lang === 'id' ? 'Unduh TXT' : 'Download TXT'}
              </button>
              <button className="btn text-sm" onClick={shareWa}>
                <Share2 className="inline h-3.5 w-3.5 mr-1" />
                wa.me
              </button>
            </div>
            {!user && (
              <p className="text-xs text-muted-foreground mt-2">
                {lang === 'id' ? 'Login untuk auto-save template ke history.' : 'Login to auto-save templates to history.'}
              </p>
            )}
          </div>

          {preview && (
            <div className="card p-4">
              <h3 className="font-semibold mb-2 text-sm">
                {lang === 'id' ? 'Pratinjau' : 'Preview'}
              </h3>
              <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono p-3 bg-muted rounded max-h-96 overflow-y-auto">
                {preview}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}