export interface Pasal {
  id: string;
  uu: string;
  uuShort: string;
  pasal: number;
  category: 'pidana' | 'perdata' | 'ketenagakerjaan' | 'perusahaan' | 'hki' | 'konsumen' | 'data' | 'ite' | 'perkawinan' | 'arbitrase';
  effective: string;
  text: string;
  keywords: string[];
}

export interface UU {
  id: string;
  short: string;
  full: string;
  number: string;
  year: number;
  category: Pasal['category'];
  effective: string;
  pasalList: Pasal[];
}

// Corpus hukum Indonesia — disusun untuk demo TF-IDF matching
// Snippet realistis tetapi SIMULASI (bukan terjemahan resmi)
export const UU_LIST: UU[] = [
  {
    id: 'ku hp',
    short: 'KUHP',
    full: 'Kitab Undang-Undang Hukum Pidana',
    number: 'UU No. 1/1946',
    year: 1946,
    category: 'pidana',
    effective: '1946-02-10',
    pasalList: [
      { id: 'p-1', uu: 'KUHP', uuShort: 'KUHP', pasal: 362, category: 'pidana', effective: '1946-02-10',
        text: 'Barang siapa mengambil barang sesuatu, yang seluruhnya atau sebagian kepunyaan orang lain, dengan maksud untuk dimiliki secara melawan hukum, diancam karena pencurian dengan pidana penjara paling lama lima tahun atau denda paling banyak sembilan ratus rupiah.',
        keywords: ['pencurian', 'mengambil', 'milik', 'lawan hukum', 'pidana'] },
      { id: 'p-2', uu: 'KUHP', uuShort: 'KUHP', pasal: 378, category: 'pidana', effective: '1946-02-10',
        text: 'Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, dengan memakai nama palsu atau martabat palsu, dengan tipu muslihat, ataupun dengan rantai kebohongan, menggerakkan orang lain untuk menyerahkan barang sesuatu kepadanya, atau supaya memberi hutang maupun menghapuskan piutang, diancam karena penipuan dengan pidana penjara paling lama empat tahun.',
        keywords: ['penipuan', 'tipu muslihat', 'kebohongan', 'nama palsu', 'pidana'] },
      { id: 'p-3', uu: 'KUHP', uuShort: 'KUHP', pasal: 263, category: 'pidana', effective: '1946-02-10',
        text: 'Barang siapa membuat surat palsu atau memalsukan surat yang dapat menimbulkan sesuatu hak, perikatan atau pembebasan hutang, atau yang diperuntukkan sebagai bukti daripada sesuatu hal, dengan maksud untuk memakai atau menyuruh orang lain memakai surat itu seolah-olah isinya benar dan tidak dipalsu, diancam karena pemalsuan surat dengan pidana penjara paling lama enam tahun.',
        keywords: ['pemalsuan', 'surat palsu', 'bukti', 'pidana'] },
      { id: 'p-4', uu: 'KUHP', uuShort: 'KUHP', pasal: 351, category: 'pidana', effective: '1946-02-10',
        text: 'Penganiayaan diancam dengan pidana penjara paling lama dua tahun delapan bulan atau denda paling banyak empat ribu lima ratus rupiah.',
        keywords: ['penganiayaan', 'kekerasan', 'pidana'] },
      { id: 'p-5', uu: 'KUHP', uuShort: 'KUHP', pasal: 338, category: 'pidana', effective: '1946-02-10',
        text: 'Barang siapa sengaja merampas nyawa orang lain, diancam karena pembunuhan dengan pidana penjara paling lama lima belas tahun.',
        keywords: ['pembunuhan', 'nyawa', 'pidana'] },
      { id: 'p-6', uu: 'KUHP', uuShort: 'KUHP', pasal: 372, category: 'pidana', effective: '1946-02-10',
        text: 'Penggelapan dilakukan oleh seseorang yang memegang barang sesuatu karena ada perjanjian untuk menyimpan, memakai, atau hal lain, lalu barang itu dengan sengaja tidak dikembalikan atau dijual dengan maksud untuk dimiliki secara melawan hukum.',
        keywords: ['penggelapan', 'menyimpan', 'lawan hukum', 'pidana'] },
    ],
  },
  {
    id: 'kuhap',
    short: 'KUHAP',
    full: 'Kitab Undang-Undang Hukum Acara Pidana',
    number: 'UU No. 8/1981',
    year: 1981,
    category: 'pidana',
    effective: '1981-12-31',
    pasalList: [
      { id: 'k-1', uu: 'KUHAP', uuShort: 'KUHAP', pasal: 1, category: 'pidana', effective: '1981-12-31',
        text: 'Pidana adalah kewenangan untuk mengajukan dan melaksanakan putusan oleh hakim. Penyidikan adalah serangkaian tindakan penyidik untuk mencari serta mengumpulkan bukti.',
        keywords: ['penyidikan', 'hakim', 'putusan', 'bukti'] },
      { id: 'k-2', uu: 'KUHAP', uuShort: 'KUHAP', pasal: 21, category: 'pidana', effective: '1981-12-31',
        text: 'Penangkapan untuk kepentingan penyidikan berdasarkan perintah tertulis dari ketua atau hakim pengadilan negeri atau pejabat lain yang ditunjuk.',
        keywords: ['penangkapan', 'penyidikan', 'pengadilan negeri'] },
      { id: 'k-3', uu: 'KUHAP', uuShort: 'KUHAP', pasal: 102, category: 'pidana', effective: '1981-12-31',
        text: 'Tersangka atau terdakwa berhak menghubungi dan berbicara dengan penasihat hukum untuk kepentingan pembelaan di setiap tingkat pemeriksaan.',
        keywords: ['tersangka', 'terdakwa', 'penasihat hukum', 'pembelaan'] },
    ],
  },
  {
    id: 'uu-ketenagakerjaan',
    short: 'UU Ketenagakerjaan',
    full: 'Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan',
    number: 'UU No. 13/2003',
    year: 2003,
    category: 'ketenagakerjaan',
    effective: '2003-10-25',
    pasalList: [
      { id: 't-1', uu: 'UU Ketenagakerjaan', uuShort: 'UU 13/2003', pasal: 156, category: 'ketenagakerjaan', effective: '2003-10-25',
        text: 'Pemberian pesangon diberikan kepada pekerja/buruh yang mengalami pemutusan hubungan kerja dengan perhitungan masa kerja berturut-turut minimal satu tahun berhak atas satu bulan upah.',
        keywords: ['pesangon', 'PHK', 'pemutusan hubungan kerja', 'upah'] },
      { id: 't-2', uu: 'UU Ketenagakerjaan', uuShort: 'UU 13/2003', pasal: 81, category: 'ketenagakerjaan', effective: '2003-10-25',
        text: 'Pekerja/buruh yang telah mempunyai masa kerja paling sedikit satu tahun pada suatu perusahaan berhak atas cuti tahunan sekurang-kurangnya dua belas hari kerja.',
        keywords: ['cuti', 'libur', 'masa kerja'] },
      { id: 't-3', uu: 'UU Ketenagakerjaan', uuShort: 'UU 13/2003', pasal: 90, category: 'ketenagakerjaan', effective: '2003-10-25',
        text: 'Pengusaha dilarang membayar upah lebih rendah dari upah minimum yang berlaku di wilayahnya. Pelanggaran dikenai sanksi pidana penjara minimal satu tahun dan maksimal empat tahun.',
        keywords: ['upah minimum', 'UMR', 'UMK', 'UMK', 'sanksi'] },
      { id: 't-4', uu: 'UU Ketenagakerjaan', uuShort: 'UU 13/2003', pasal: 95, category: 'ketenagakerjaan', effective: '2003-10-25',
        text: 'Pekerja/buruh yang bekerja pada perusahaan berhak memperoleh perlindungan atas keselamatan dan kesehatan kerja, termasuk perlindungan atas upah yang seharusnya diterima.',
        keywords: ['K3', 'perlindungan', 'upah terlambat'] },
    ],
  },
  {
    id: 'uu-cipta-kerja',
    short: 'UU Cipta Kerja',
    full: 'Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja',
    number: 'UU No. 11/2020',
    year: 2020,
    category: 'ketenagakerjaan',
    effective: '2020-11-02',
    pasalList: [
      { id: 'c-1', uu: 'UU Cipta Kerja', uuShort: 'UU 11/2020', pasal: 81, category: 'ketenagakerjaan', effective: '2020-11-02',
        text: 'Perjanjian kerja waktu tertentu dapat dibuat untuk jangka waktu paling lama lima tahun, termasuk perpanjangan, dengan jeda satu bulan sebelum perpanjangan.',
        keywords: ['PKWT', 'kontrak kerja', 'perjanjian kerja', 'jangka waktu'] },
      { id: 'c-2', uu: 'UU Cipta Kerja', uuShort: 'UU 11/2020', pasal: 156, category: 'ketenagakerjaan', effective: '2020-11-02',
        text: 'Besaran uang pesangon pekerja/buruh disesuaikan: masa kerja 1-2 tahun = 1 bulan upah; 2-3 tahun = 2 bulan; 3-4 tahun = 3 bulan; 4-5 tahun = 4 bulan; 5-6 tahun = 5 bulan; 6-7 tahun = 6 bulan; 7-8 tahun = 7 bulan; lebih dari 8 tahun = 8 bulan.',
        keywords: ['pesangon', 'PHK', 'masa kerja', 'klaster ketenagakerjaan'] },
      { id: 'c-3', uu: 'UU Cipta Kerja', uuShort: 'UU 11/2020', pasal: 51, category: 'perusahaan', effective: '2020-11-02',
        text: 'Perseroan terbatas dapat didirikan oleh 2 orang atau lebih dengan akta pendirian di hadapan notaris. Sejak Omnibus Law, PT perorangan juga dapat didirikan.',
        keywords: ['PT perorangan', 'perseroan terbatas', 'pendirian PT', 'omnibus'] },
    ],
  },
  {
    id: 'uu-perkawinan',
    short: 'UU Perkawinan',
    full: 'Undang-Undang Nomor 1 Tahun 1974 tentang Perkawinan',
    number: 'UU No. 1/1974',
    year: 1974,
    category: 'perkawinan',
    effective: '1975-10-01',
    pasalList: [
      { id: 'w-1', uu: 'UU Perkawinan', uuShort: 'UU 1/1974', pasal: 1, category: 'perkawinan', effective: '1975-10-01',
        text: 'Perkawinan ialah ikatan lahir batin antara seorang pria dengan seorang wanita sebagai suami istri dengan tujuan membentuk keluarga (rumah tangga) yang bahagia dan kekal berdasarkan Ketuhanan Yang Maha Esa.',
        keywords: ['perkawinan', 'suami istri', 'keluarga'] },
      { id: 'w-2', uu: 'UU Perkawinan', uuShort: 'UU 1/1974', pasal: 2, category: 'perkawinan', effective: '1975-10-01',
        text: 'Perkawinan adalah sah apabila dilakukan menurut hukum masing-masing agamanya dan kepercayaannya itu. Tiap-tiap perkawinan dicatat menurut peraturan perundang-undangan yang berlaku.',
        keywords: ['syarat nikah', 'catatan sipil', 'agama'] },
      { id: 'w-3', uu: 'UU Perkawinan', uuShort: 'UU 1/1974', pasal: 34, category: 'perkawinan', effective: '1975-10-01',
        text: 'Suami istri wajib saling cinta-mencintai, hormat-menghormati, setia dan memberikan bantuan lahir batin satu sama lain. Masing-masing pihak berhak untuk melakukan perbuatan hukum atas nama dirinya sendiri.',
        keywords: ['hak suami istri', 'perceraian', 'kewajiban'] },
      { id: 'w-4', uu: 'UU Perkawinan', uuShort: 'UU 1/1974', pasal: 39, category: 'perkawinan', effective: '1975-10-01',
        text: 'Perceraian hanya dapat dilakukan di depan sidang Pengadilan setelah usaha perdamaian gagal. Untuk melakukan perceraian harus ada alasan yang cukup bahwa antara suami istri sudah tidak dapat hidup rukun sebagai suami istri.',
        keywords: ['perceraian', 'pengadilan', 'gugat cerai'] },
    ],
  },
  {
    id: 'uu-perseroan',
    short: 'UU PT',
    full: 'Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas',
    number: 'UU No. 40/2007',
    year: 2007,
    category: 'perusahaan',
    effective: '2007-08-16',
    pasalList: [
      { id: 'pt-1', uu: 'UU PT', uuShort: 'UU 40/2007', pasal: 1, category: 'perusahaan', effective: '2007-08-16',
        text: 'Perseroan Terbatas, yang selanjutnya disebut Perseroan, adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham.',
        keywords: ['perseroan terbatas', 'PT', 'badan hukum', 'saham'] },
      { id: 'pt-2', uu: 'UU PT', uuShort: 'UU 40/2007', pasal: 7, category: 'perusahaan', effective: '2007-08-16',
        text: 'Perseroan didirikan oleh 2 orang atau lebih dengan akta notaris yang berbahasa Indonesia. Pendirian perseroan tidak boleh dilakukan oleh 1 orang, kecuali UU Cipta Kerja mengatur PT perorangan.',
        keywords: ['pendirian PT', 'akta notaris', 'pendiri'] },
      { id: 'pt-3', uu: 'UU PT', uuShort: 'UU 40/2007', pasal: 92, category: 'perusahaan', effective: '2007-08-16',
        text: 'Direksi bertanggung jawab penuh atas pengurusan perseroan untuk kepentingan dan tujuan perseroan serta mewakili perseroan baik di dalam maupun di luar pengadilan.',
        keywords: ['direksi', 'tanggung jawab', 'pengurusan'] },
    ],
  },
  {
    id: 'uu-konsumen',
    short: 'UU Perlindungan Konsumen',
    full: 'Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen',
    number: 'UU No. 8/1999',
    year: 1999,
    category: 'konsumen',
    effective: '2000-11-20',
    pasalList: [
      { id: 'kn-1', uu: 'UU Perlindungan Konsumen', uuShort: 'UU 8/1999', pasal: 4, category: 'konsumen', effective: '2000-11-20',
        text: 'Hak konsumen adalah hak atas kenyamanan, keamanan, dan keselamatan dalam mengonsumsi barang dan/atau jasa; hak atas informasi yang benar, jelas, dan jujur mengenai kondisi dan jaminan barang dan/atau jasa.',
        keywords: ['hak konsumen', 'informasi produk', 'keamanan'] },
      { id: 'kn-2', uu: 'UU Perlindungan Konsumen', uuShort: 'UU 8/1999', pasal: 19, category: 'konsumen', effective: '2000-11-20',
        text: 'Pelaku usaha menawarkan barang dan/atau jasa yang ditujukan untuk diperdagangkan dengan cara memberikan informasi yang benar, jelas, dan jujur mengenai kondisi, jaminan, dan risiko barang.',
        keywords: ['kewajiban pelaku usaha', 'informasi produk', 'risiko barang'] },
      { id: 'kn-3', uu: 'UU Perlindungan Konsumen', uuShort: 'UU 8/1999', pasal: 23, category: 'konsumen', effective: '2000-11-20',
        text: 'Pelaku usaha yang menolak memberikan ganti rugi kepada konsumen dapat digugat melalui Badan Penyelesaian Sengketa Konsumen atau melalui pengadilan di tempat tinggal konsumen.',
        keywords: ['ganti rugi', 'sengketa konsumen', 'yayasan Lembaga Perlindungan Konsumen'] },
    ],
  },
  {
    id: 'uu-ite',
    short: 'UU ITE',
    full: 'Undang-Undang Nomor 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik',
    number: 'UU No. 19/2016',
    year: 2016,
    category: 'ite',
    effective: '2017-11-10',
    pasalList: [
      { id: 'it-1', uu: 'UU ITE', uuShort: 'UU 19/2016', pasal: 27, category: 'ite', effective: '2017-11-10',
        text: 'Setiap orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan dan/atau membuat dapat diaksesnya Informasi Elektronik dan/atau Dokumen Elektronik yang memiliki muatan yang melanggar kesusilaan, perjudian, penghinaan, pemerasan, pengancaman, atau berita bohong.',
        keywords: ['hoaks', 'pornografi', 'pelecehan', 'pemerasan', 'sara'] },
      { id: 'it-2', uu: 'UU ITE', uuShort: 'UU 19/2016', pasal: 28, category: 'ite', effective: '2017-11-10',
        text: 'Setiap orang dengan sengaja dan tanpa hak menyebarkan berita bohong dan menyesatkan yang mengakibatkan kerugian konsumen dalam Transaksi Elektronik.',
        keywords: ['hoaks', 'transaksi elektronik', 'berita bohong'] },
      { id: 'it-3', uu: 'UU ITE', uuShort: 'UU 19/2016', pasal: 32, category: 'ite', effective: '2017-11-10',
        text: 'Setiap orang dengan sengaja dan tanpa hak atau melawan hukum dengan cara apa pun memindahkan, mengubah, merusak, atau menghapus Informasi Elektronik dan/atau Dokumen Elektronik milik orang lain.',
        keywords: ['peretasan', 'data elektronik', 'sabotase'] },
    ],
  },
  {
    id: 'uu-pdp',
    short: 'UU PDP',
    full: 'Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi',
    number: 'UU No. 27/2022',
    year: 2022,
    category: 'data',
    effective: '2023-10-17',
    pasalList: [
      { id: 'dp-1', uu: 'UU PDP', uuShort: 'UU 27/2022', pasal: 1, category: 'data', effective: '2023-10-17',
        text: 'Data Pribadi adalah data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi secara tersendiri atau dikombinasi dengan informasi lainnya baik secara langsung maupun tidak langsung.',
        keywords: ['data pribadi', 'privasi', 'identifikasi'] },
      { id: 'dp-2', uu: 'UU PDP', uuShort: 'UU 27/2022', pasal: 21, category: 'data', effective: '2023-10-17',
        text: 'Pengendali Data Pribadi wajib memperoleh persetujuan Subjek Data Pribadi sebelum memproses Data Pribadi. Persetujuan harus diberikan secara tertulis atau terekam.',
        keywords: ['persetujuan', 'pengendali data', 'consent'] },
      { id: 'dp-3', uu: 'UU PDP', uuShort: 'UU 27/2022', pasal: 46, category: 'data', effective: '2023-10-17',
        text: 'Pelaku pemrosesan Data Pribadi yang lalai melindungi Data Pribadi dapat dikenai sanksi administratif denda paling banyak 5 miliar rupiah atau penjara paling lama 5 tahun.',
        keywords: ['pelanggaran data', 'sanksi', 'denda', 'pidana'] },
    ],
  },
  {
    id: 'uu-haki',
    short: 'UU Hak Cipta',
    full: 'Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta',
    number: 'UU No. 28/2014',
    year: 2014,
    category: 'hki',
    effective: '2014-10-16',
    pasalList: [
      { id: 'h-1', uu: 'UU Hak Cipta', uuShort: 'UU 28/2014', pasal: 1, category: 'hki', effective: '2014-10-16',
        text: 'Hak Cipta adalah hak eksklusif pencipta yang timbul secara otomatis atas ciptaan di bidang ilmu pengetahuan, seni, dan sastra berdasarkan peraturan perundang-undangan.',
        keywords: ['hak cipta', 'ciptaan', 'eksklusif', 'pencipta'] },
      { id: 'h-2', uu: 'UU Hak Cipta', uuShort: 'UU 28/2014', pasal: 9, category: 'hki', effective: '2014-10-16',
        text: 'Ciptaan yang dilindungi meliputi ciptaan di bidang ilmu pengetahuan, seni, dan sastra, antara lain: buku, ceramah, lagu, drama, tari, arsitektur, peta, software komputer, foto, video.',
        keywords: ['jenis ciptaan', 'karya', 'software'] },
      { id: 'h-3', uu: 'UU Hak Cipta', uuShort: 'UU 28/2014', pasal: 113, category: 'hki', effective: '2014-10-16',
        text: 'Setiap orang yang dengan tanpa hak melakukan pelanggaran hak cipta untuk penggunaan secara komersial dipidana penjara paling lama 4 tahun dan/atau denda paling banyak 1 miliar rupiah.',
        keywords: ['pelanggaran hak cipta', 'pidana', 'bajakan'] },
    ],
  },
  {
    id: 'uu-merek',
    short: 'UU Merek',
    full: 'Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis',
    number: 'UU No. 20/2016',
    year: 2016,
    category: 'hki',
    effective: '2017-11-25',
    pasalList: [
      { id: 'm-1', uu: 'UU Merek', uuShort: 'UU 20/2016', pasal: 1, category: 'hki', effective: '2017-11-25',
        text: 'Merek adalah tanda yang dapat ditampilkan secara grafis berupa gambar, logo, nama, kata, huruf, angka, susunan warna, dalam bentuk 2 dimensi dan/atau 3 dimensi, termasuk suara, hologram, atau kombinasi dari 2 atau lebih unsur.',
        keywords: ['merek dagang', 'logo', 'trademark'] },
      { id: 'm-2', uu: 'UU Merek', uuShort: 'UU 20/2016', pasal: 35, category: 'hki', effective: '2017-11-25',
        text: 'Perlindungan merek terdaftar diberikan untuk jangka waktu 10 tahun sejak tanggal penerimaan pendaftaran dan dapat diperpanjang untuk jangka waktu yang sama.',
        keywords: ['masa perlindungan', 'perpanjangan', '10 tahun'] },
    ],
  },
  {
    id: 'uu-arbitrase',
    short: 'UU Arbitrase',
    full: 'Undang-Undang Nomor 30 Tahun 1999 tentang Arbitrase dan Alternatif Penyelesaian Sengketa',
    number: 'UU No. 30/1999',
    year: 1999,
    category: 'arbitrase',
    effective: '1999-08-12',
    pasalList: [
      { id: 'a-1', uu: 'UU Arbitrase', uuShort: 'UU 30/1999', pasal: 1, category: 'arbitrase', effective: '1999-08-12',
        text: 'Arbitrase adalah cara penyelesaian suatu sengketa perdata di luar peradilan umum yang didasarkan pada perjanjian arbitrase yang dibuat secara tertulis oleh para pihak yang bersengketa.',
        keywords: ['arbitrase', 'mediasi', 'alternative dispute resolution'] },
      { id: 'a-2', uu: 'UU Arbitrase', uuShort: 'UU 30/1999', pasal: 4, category: 'arbitrase', effective: '1999-08-12',
        text: 'Dalam hal para pihak telah menyetujui arbitrase, Pengadilan Negeri tidak berwenang mengadili sengketa antara pihak yang telah mengadakan perjanjian arbitrase.',
        keywords: ['klausul arbitrase', 'kompetensi pengadilan', 'forum arbitrase'] },
    ],
  },
];

export const CATEGORY_LABEL: Record<Pasal['category'], { id: string; en: string }> = {
  pidana: { id: 'Pidana', en: 'Criminal' },
  perdata: { id: 'Perdata', en: 'Civil' },
  ketenagakerjaan: { id: 'Ketenagakerjaan', en: 'Labor' },
  perusahaan: { id: 'Perusahaan', en: 'Corporate' },
  hki: { id: 'HKI', en: 'IP Rights' },
  konsumen: { id: 'Perlindungan Konsumen', en: 'Consumer Protection' },
  data: { id: 'Data Pribadi', en: 'Data Privacy' },
  ite: { id: 'ITE / Siber', en: 'IT/Electronic' },
  perkawinan: { id: 'Perkawinan', en: 'Marriage' },
  arbitrase: { id: 'Arbitrase', en: 'Arbitration' },
};

// Flatten all pasal for MiniSearch indexing
export function getAllPasal(): Array<Pasal & { combined: string }> {
  const flat: Array<Pasal & { combined: string }> = [];
  for (const uu of UU_LIST) {
    for (const p of uu.pasalList) {
      flat.push({ ...p, combined: `${p.text} ${p.keywords.join(' ')} ${p.uu} ${p.uuShort} ${p.pasal}` });
    }
  }
  return flat;
}