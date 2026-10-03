import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "LawBot - AI Legal Q&A untuk UMKM Indonesia",
  description: "AI legal Q&A wizard berbasis skenario untuk UMKM Indonesia. Interactive questionnaire, UU reference database, template dokumen generator, compliance checklist.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
