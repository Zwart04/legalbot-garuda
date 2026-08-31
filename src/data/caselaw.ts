export type CaseLaw = {
  id: string;
  nomor: string;
  court: 'MA' | 'PTUN' | 'PN';
  year: number;
  category:
    | 'pidana'
    | 'perdata'
    | 'ketenagakerjaan'
    | 'perusahaan'
    | 'konsumen'
    | 'hki'
    | 'data'
    | 'ite'
    | 'perkawinan'
    | 'arbitrase';
  parties: string;
  summary: string;
  pasalRefs: number[];
  uuRefs: string[];
  keywords: string[];
};

// 15 putusan mock — untuk similarity scoring
export const CASE_LAW: CaseLaw[] = [
  {
    id: 'cl-1', nomor: '123/PK/Pid/2019', court: 'MA', year: 2019, category: 'pidana',
    parties: 'Jaksa Penuntut Umum vs Budi Santoso',
    summary: 'Terdakwa terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana penipuan dengan modus investasi bodong dengan kerugian korban Rp 2,3 miliar. Hakim menjatuhi pidana 3 tahun penjara.',
    pasalRefs: [378, 263], uuRefs: ['KUHP'], keywords: ['penipuan', 'investasi', 'modus', 'korban', 'pidana'],
  },
  {
    id: 'cl-2', nomor: '456/Pdt/2021', court: 'PN', year: 2021, category: 'ketenagakerjaan',
    parties: 'Andi Wijaya vs PT Sentosa Jaya',
    summary: 'Pekerja memenangkan gugatan atas PHK sepihak tanpa pesangon yang dilakukan perusahaan. Hakim memerintahkan pembayaran pesangon sesuai UU 13/2003 dengan total Rp 87 juta.',
    pasalRefs: [156, 95], uuRefs: ['UU Ketenagakerjaan', 'UU Cipta Kerja'], keywords: ['PHK', 'pesangon', 'sepihak', 'pekerja'],
  },
  {
    id: 'cl-3', nomor: '789/Pdt.G/2022', court: 'PN', year: 2022, category: 'konsumen',
    parties: 'Maria Lestari vs Marketplace Online X',
    summary: 'Konsumen memenangkan gugatan karena barang yang diterima tidak sesuai dengan deskripsi. Pelaku usaha dihukum mengganti rugi dan menarik produk dari pasaran.',
    pasalRefs: [4, 19, 23], uuRefs: ['UU Perlindungan Konsumen'], keywords: ['tidak sesuai', 'deskripsi', 'barang', 'konsumen'],
  },
  {
    id: 'cl-4', nomor: '321/Pid.Sus/2020', court: 'PN', year: 2020, category: 'ite',
    parties: 'Publik vs "AkunMedSosY"',
    summary: 'Terdakwa menyebarkan ujaran kebencian dan berita bohong melalui media sosial yang menimbulkan keresahan publik. Hakim menjatuhi pidana 2 tahun penjara.',
    pasalRefs: [27, 28], uuRefs: ['UU ITE'], keywords: ['ujaran kebencian', 'berita bohong', 'sosmed', 'hoaks'],
  },
  {
    id: 'cl-5', nomor: '654/Pdt/2020', court: 'PN', year: 2020, category: 'hki',
    parties: 'PT Kreatif Indonesia vs CV Bajakan Musik',
    summary: 'Penggugat memenangkan gugatan atas pelanggaran hak cipta lagu yang digunakan secara komersial tanpa lisensi. Pengganti rugi Rp 500 juta.',
    pasalRefs: [9, 113], uuRefs: ['UU Hak Cipta'], keywords: ['hak cipta', 'lagu', 'bajakan', 'lisensi'],
  },
  {
    id: 'cl-6', nomor: '111/PK/Pdt/2018', court: 'MA', year: 2018, category: 'perdata',
    parties: 'Hartono vs PT Mitra Abadi',
    summary: 'Pemegang saham minoritas memenangkan gugatan atas tindakan direksi yang diambil tanpa RUPS. Direksi dinyatakan melanggar UU PT dan wajib ganti rugi.',
    pasalRefs: [92], uuRefs: ['UU PT'], keywords: ['direksi', 'RUPS', 'pemegang saham', 'minoritas'],
  },
  {
    id: 'cl-7', nomor: '222/Arb/2023', court: 'PN', year: 2023, category: 'arbitrase',
    parties: 'PT Kontraktor A vs PT Supplier B',
    summary: 'Sengketa kontrak konstruksi diselesaikan melalui arbitrase BANI berdasarkan klausul arbitrase dalam kontrak. Putusan arbitrase bersifat final dan mengikat.',
    pasalRefs: [1, 4], uuRefs: ['UU Arbitrase'], keywords: ['arbitrase', 'konstruksi', 'BANI'],
  },
  {
    id: 'cl-8', nomor: '888/Pdt/2022', court: 'PN', year: 2022, category: 'data',
    parties: 'Konsumen Fintech vs PT Pinjol Online',
    summary: 'Pengguna aplikasi pinjaman online memenangkan gugatan atas penyalahgunaan data pribadi yang disebarkan ke pihak ketiga tanpa persetujuan.',
    pasalRefs: [1, 21, 46], uuRefs: ['UU PDP'], keywords: ['data pribadi', 'pinjaman online', 'persetujuan', 'penyalahgunaan'],
  },
  {
    id: 'cl-9', nomor: '999/Pid/2021', court: 'PN', year: 2021, category: 'pidana',
    parties: 'Publik vs Mantan Karyawan Bank',
    summary: 'Terdakwa terbukti menggelapkan dana nasabah Rp 12 miliar menggunakan akses database internal. Pidana 7 tahun penjara.',
    pasalRefs: [372, 263], uuRefs: ['KUHP'], keywords: ['penggelapan', 'nasabah', 'bank', 'database'],
  },
  {
    id: 'cl-10', nomor: '444/Pdt/2019', court: 'PN', year: 2019, category: 'ketenagakerjaan',
    parties: 'Serikat Pekerja vs PT Manufaktur X',
    summary: 'Pekerja memenangkan gugatan kelas atas upah yang dibayar di bawah UMK selama 3 tahun. Perusahaan dihukum membayar selisih upah Rp 45 miliar.',
    pasalRefs: [90, 95], uuRefs: ['UU Ketenagakerjaan'], keywords: ['upah minimum', 'UMK', 'gugatan kelas', 'selisih'],
  },
  {
    id: 'cl-11', nomor: '777/PK/Pid/2022', court: 'MA', year: 2022, category: 'pidana',
    parties: 'JPU vs "Hacker" Profesional',
    summary: 'Terdakwa terbukti meretas sistem pembayaran sebuah e-commerce dan mencuri data 50.000 pengguna. Pidana 5 tahun penjara dan denda Rp 2 miliar.',
    pasalRefs: [32, 362], uuRefs: ['UU ITE', 'KUHP'], keywords: ['peretasan', 'e-commerce', 'data breach', 'hacker'],
  },
  {
    id: 'cl-12', nomor: '555/Pdt.G/2021', court: 'PN', year: 2021, category: 'perkawinan',
    parties: 'Istri vs Suami (inisial)',
    summary: 'Istri memenangkan gugatan cerai atas dasar KDRT yang dilakukan suami. Hakim memutuskan perceraian dan mewajibkan suami memberikan nafkah anak Rp 5 juta/bulan.',
    pasalRefs: [39, 34], uuRefs: ['UU Perkawinan'], keywords: ['cerai', 'KDRT', 'nafkah anak'],
  },
  {
    id: 'cl-13', nomor: '333/PK/Pdt/2023', court: 'MA', year: 2023, category: 'perusahaan',
    parties: 'Kreditor vs Direksi PT Garmenindo',
    summary: 'Direksi PT dinyatakan bertanggung jawab secara pribadi atas utang perusahaan yang sengaja tidak dibayar. Keputusan MA menegaskan tanggung jawab direksi berdasarkan UU PT.',
    pasalRefs: [92], uuRefs: ['UU PT'], keywords: ['direksi', 'utang', 'tanggung jawab pribadi'],
  },
  {
    id: 'cl-14', nomor: '666/Pdt/2020', court: 'PN', year: 2020, category: 'hki',
    parties: 'Brand Fashion Lokal vs Toko Online',
    summary: 'Pemilik merek terdaftar memenangkan gugatan atas penggunaan merek serupa oleh toko online yang menyebabkan kebingungan konsumen. Pelaku usaha dilarang menggunakan merek.',
    pasalRefs: [1, 35], uuRefs: ['UU Merek'], keywords: ['merek', 'serupa', 'kebingungan konsumen', 'toko online'],
  },
  {
    id: 'cl-15', nomor: '012/Pid.Sus/2024', court: 'PN', year: 2024, category: 'konsumen',
    parties: 'Konsumen vs Produsen Skincare',
    summary: 'Konsumen memenangkan gugatan karena produk skincare tidak mencantumkan komposisi lengkap dan menyebabkan alergi. BPOM dimintakan menarik produk dari pasaran.',
    pasalRefs: [4, 19], uuRefs: ['UU Perlindungan Konsumen'], keywords: ['skincare', 'komposisi', 'alergi', 'BPOM'],
  },
];