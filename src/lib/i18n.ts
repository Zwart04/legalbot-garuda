export type Dict = {
  id: {
    appName: string;
    tagline: string;
    nav: {
      dashboard: string;
      lookup: string;
      browser: string;
      caselaw: string;
      template: string;
      history: string;
      dictionary: string;
      finance: string;
      analytics: string;
      login: string;
      logout: string;
    };
    common: {
      welcome: string;
      copyright: string;
      language: string;
      theme: string;
      light: string;
      dark: string;
    };
  };
  en: {
    appName: string;
    tagline: string;
    nav: {
      dashboard: string;
      lookup: string;
      browser: string;
      caselaw: string;
      template: string;
      history: string;
      dictionary: string;
      finance: string;
      analytics: string;
      login: string;
      logout: string;
    };
    common: {
      welcome: string;
      copyright: string;
      language: string;
      theme: string;
      light: string;
      dark: string;
    };
  };
};

export const dict: Dict = {
  id: {
    appName: 'LegalBot Garuda',
    tagline: 'AI hukum Indonesia untuk UMKM & praktisi',
    nav: {
      dashboard: 'Dasbor',
      lookup: 'Cari Pasal',
      browser: 'Kamus UU',
      caselaw: 'Putusan',
      template: 'Template',
      history: 'Riset',
      dictionary: 'Glosarium',
      finance: 'Jurnal',
      analytics: 'Analitik',
      login: 'Masuk',
      logout: 'Keluar',
    },
    common: {
      welcome: 'Selamat datang',
      copyright: '© 2026 LegalBot Garuda',
      language: 'Bahasa',
      theme: 'Tema',
      light: 'Terang',
      dark: 'Gelap',
    },
  },
  en: {
    appName: 'LegalBot Garuda',
    tagline: 'Indonesian legal AI for SMBs & practitioners',
    nav: {
      dashboard: 'Dashboard',
      lookup: 'Pasal Lookup',
      browser: 'UU Browser',
      caselaw: 'Case Law',
      template: 'Templates',
      history: 'Research',
      dictionary: 'Glossary',
      finance: 'Journal',
      analytics: 'Analytics',
      login: 'Login',
      logout: 'Logout',
    },
    common: {
      welcome: 'Welcome',
      copyright: '© 2026 LegalBot Garuda',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
  },
};