'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/auth';
import { BookText, ChevronDown, ChevronRight, Search } from 'lucide-react';

const TERMS = [
  { id: 'novasi', idDef: 'Perjanjian yang menggantikan utang lama dengan utang baru.', enDef: 'Agreement that replaces an old debt with a new one.', pasal: 'KUHP Pasal 1388, KUH Perdata Pasal 1388' },
  { id: 'subrogasi', idDef: 'Pergantian hak kreditur oleh pihak ketiga yang melunasi utang.', enDef: 'Replacement of creditor rights by a third party who pays off the debt.', pasal: 'KUH Perdata Pasal 1400' },
  { id: 'wanprestasi', idDef: 'Tidak memenuhi prestasi dalam perjanjian (ingkar janji).', enDef: 'Failure to fulfill obligations in an agreement (breach).', pasal: 'KUH Perdata Pasal 1238' },
  { id: 'cidera janji', idDef: 'Istilah lain untuk wanprestasi.', enDef: 'Another term for breach of contract.', pasal: 'KUH Perdata Pasal 1238' },
  { id: 'force majeure', idDef: 'Keadaan memaksa di luar kendali pihak (bencana alam, perang).', enDef: 'Force majeure: circumstances beyond control (natural disaster, war).', pasal: 'KUH Perdata Pasal 1244' },
  { id: 'insolvensi', idDef: 'Keadaan tidak mampu membayar utang.', enDef: 'State of being unable to pay debts.', pasal: 'UU Kepailitan dan PKPU' },
  { id: 'eksekusi', idDef: 'Pelaksanaan putusan pengadilan secara paksa.', enDef: 'Forced enforcement of a court ruling.', pasal: 'HIR Pasal 196' },
  { id: 'daluarsa', idDef: 'Batas waktu penuntutan hukum (lewat waktu = gugur).', enDef: 'Statute of limitations (lapsed time = extinguished).', pasal: 'KUHP Pasal 78' },
  { id: 'kompensasi', idDef: 'Perjumpaan utang yang saling menghapuskan.', enDef: 'Set-off of mutual debts.', pasal: 'KUH Perdata Pasal 1428' },
  { id: 'restitusi', idDef: 'Pengembalian pada keadaan semula (pembatalan).', enDef: 'Restoration to original state (cancellation).', pasal: 'KUH Perdata Pasal 1384' },
  { id: 'fidusia', idDef: 'Jaminan kebendaan atas utang dengan benda bergerak.', enDef: 'Security interest over movable property for debt.', pasal: 'UU 42/1999 tentang Jaminan Fidusia' },
  { id: 'hipotek', idDef: 'Jaminan kebendaan atas tanah untuk utang.', enDef: 'Security interest over land for debt.', pasal: 'UU 4/1996 tentang Hak Tanggungan' },
  { id: 'gugatan', idDef: 'Tuntutan hak yang diajukan ke pengadilan.', enDef: 'Legal claim filed with the court.', pasal: 'HIR Pasal 142' },
  { id: 'somasi', idDef: 'Peringatan tertulis untuk memenuhi kewajiban.', enDef: 'Written warning to fulfill an obligation.', pasal: 'KUH Perdata Pasal 1238' },
  { id: 'arbitrase', idDef: 'Penyelesaian sengketa di luar pengadilan.', enDef: 'Dispute resolution outside court.', pasal: 'UU 30/1999 tentang Arbitrase' },
  { id: 'mediasi', idDef: 'Upaya damai dengan bantuan mediator.', enDef: 'Peaceful resolution with mediator assistance.', pasal: 'PERMA 1/2016' },
  { id: 'putusan verstek', idDef: 'Putusan tanpa kehadiran tergugat.', enDef: 'Ruling without defendant presence.', pasal: 'HIR Pasal 125' },
  { id: 'gugatan perwakilan', idDef: 'Gugatan class action untuk kepentingan bersama.', enDef: 'Class action lawsuit for common interest.', pasal: 'PERMA 1/2002' },
  { id: 'PHK', idDef: 'Pemutusan Hubungan Kerja.', enDef: 'Termination of Employment.', pasal: 'UU 13/2003 jo. UU Cipta Kerja' },
  { id: 'pesangon', idDef: 'Uang yang dibayar pengusaha saat PHK.', enDef: 'Money paid by employer upon termination.', pasal: 'UU 13/2003 Pasal 156' },
  { id: 'PKWT', idDef: 'Perjanjian Kerja Waktu Tertentu (kontrak).', enDef: 'Fixed-Term Employment Contract.', pasal: 'UU 13/2003 Pasal 56' },
  { id: 'direksi', idDef: 'Organ perseroan yang mengurus perseroan.', enDef: 'Corporate organ managing the company.', pasal: 'UU 40/2007 Pasal 92' },
  { id: 'RUPS', idDef: 'Rapat Umum Pemegang Saham.', enDef: 'General Meeting of Shareholders.', pasal: 'UU 40/2007 Pasal 78' },
  { id: 'komisaris', idDef: 'Organ pengawas perseroan.', enDef: 'Corporate supervisory organ.', pasal: 'UU 40/2007 Pasal 108' },
  { id: 'merek dagang', idDef: 'Tanda pembeda barang/jasa.', enDef: 'Distinctive sign for goods/services.', pasal: 'UU 20/2016 Pasal 1' },
  { id: 'hak cipta', idDef: 'Hak eksklusif pencipta atas ciptaan.', enDef: 'Exclusive creator right over work.', pasal: 'UU 28/2014 Pasal 1' },
  { id: 'lisensi', idDef: 'Izin penggunaan hak cipta/merek oleh pihak lain.', enDef: 'Permission to use IP/trademark by another party.', pasal: 'UU 28/2014 Pasal 80' },
  { id: 'pembajakan', idDef: 'Penggunaan ciptaan tanpa izin.', enDef: 'Unauthorized use of copyrighted work.', pasal: 'UU 28/2014 Pasal 113' },
  { id: 'data pribadi', idDef: 'Data tentang orang perseorangan teridentifikasi.', enDef: 'Data about identified individuals.', pasal: 'UU 27/2022 Pasal 1' },
  { id: 'pengendali data', idDef: 'Pihak yang menentukan tujuan pemrosesan data.', enDef: 'Party determining purpose of data processing.', pasal: 'UU 27/2022 Pasal 1' },
  { id: 'subjek data', idDef: 'Orang yang datanya diproses.', enDef: 'Person whose data is processed.', pasal: 'UU 27/2022 Pasal 1' },
  { id: 'persetujuan', idDef: 'Consent for data processing.', enDef: 'Permission to process data.', pasal: 'UU 27/2022 Pasal 21' },
  { id: 'berita bohong', idDef: 'Informasi palsu yang menyesatkan publik.', enDef: 'False information misleading the public.', pasal: 'UU ITE Pasal 28' },
  { id: 'ujaran kebencian', idDef: 'Pernyataan yang memicu kebencian atas SARA.', enDef: 'Statements inciting hatred on SARA grounds.', pasal: 'UU ITE Pasal 28' },
  { id: 'defamasi', idDef: 'Pernyataan yang merusak nama baik.', enDef: 'Statements damaging reputation.', pasal: 'KUHP Pasal 311, UU ITE Pasal 27' },
  { id: 'perkawinan', idDef: 'Ikatan lahir batin dua pihak.', enDef: 'Physical-spiritual bond of two parties.', pasal: 'UU 1/1974 Pasal 1' },
  { id: 'perceraian', idDef: 'Pembubaran perkawinan oleh pengadilan.', enDef: 'Dissolution of marriage by court.', pasal: 'UU 1/1974 Pasal 39' },
  { id: 'harta gono-gini', idDef: 'Harta bersama suami-istri.', enDef: 'Joint marital property.', pasal: 'UU 1/1974 Pasal 35' },
  { id: 'pengadilan niaga', idDef: 'Pengadilan khusus perkara niaga/pailit.', enDef: 'Special court for commercial/bankruptcy cases.', pasal: 'UU 37/2004' },
  { id: 'klausul baku', idDef: 'Ketentuan yang ditetapkan sepihak.', enDef: 'Terms set unilaterally.', pasal: 'UU Perlindungan Konsumen Pasal 18' },
  { id: 'konsumen', idDef: 'Pengguna barang/jasa dari pelaku usaha.', enDef: 'User of goods/services from business actor.', pasal: 'UU 8/1999 Pasal 1' },
  { id: 'pelaku usaha', idDef: 'Penyedia barang/jasa.', enDef: 'Provider of goods/services.', pasal: 'UU 8/1999 Pasal 1' },
  { id: 'itikad baik', idDef: 'Prinsip kejujuran dalam perbuatan hukum.', enDef: 'Principle of honesty in legal acts.', pasal: 'KUH Perdata Pasal 1338' },
  { id: 'kepastian hukum', idDef: 'Jaminan perlindungan hukum.', enDef: 'Guarantee of legal protection.', pasal: 'UUD 1945 Pasal 28D' },
  { id: 'asas legalitas', idDef: 'Tiada pidana tanpa UU (nullum delictum nulla poena sine praevia lege poenali).', enDef: 'No punishment without law (nullum delictum nulla poena sine praevia lege poenali).', pasal: 'KUHP Pasal 1, UUD 1945 Pasal 28I' },
];

export default function DictionaryPage() {
  const { lang } = useApp();
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return TERMS;
    return TERMS.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.idDef.toLowerCase().includes(q) ||
        t.enDef.toLowerCase().includes(q) ||
        t.pasal.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <BookText className="h-6 w-6 text-emerald-600" />
        <h2 className="text-3xl font-bold tracking-tight">
          {lang === 'id' ? 'Glosarium Hukum' : 'Legal Glossary'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {lang === 'id'
          ? `${TERMS.length}+ istilah hukum Indonesia dengan definisi dan pasal rujukan.`
          : `${TERMS.length}+ Indonesian legal terms with definitions and article references.`}
      </p>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === 'id' ? 'Cari istilah...' : 'Search term...'}
          className="w-full border border-border rounded pl-10 pr-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="space-y-1">
        {filtered.map((t) => {
          const isOpen = openId === t.id;
          return (
            <div key={t.id} className="card overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : t.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/50 text-left"
              >
                <span className="font-medium text-sm capitalize">{t.id.replace(/-/g, ' ')}</span>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {isOpen && (
                <div className="border-t border-border p-3 space-y-2 text-sm">
                  <p>
                    <strong className="text-emerald-700">ID:</strong> {t.idDef}
                  </p>
                  <p>
                    <strong className="text-emerald-700">EN:</strong> {t.enDef}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lang === 'id' ? 'Rujukan' : 'References'}: {t.pasal}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-6 text-center text-muted-foreground">
          {lang === 'id' ? 'Istilah tidak ditemukan.' : 'Term not found.'}
        </div>
      )}
    </section>
  );
}