import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "실생활 계산기", template: "%s | 실생활 계산기" },
  description: "세금·투자·대출·건강 계산기 모음 — 2026년 기준",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={geist.variable}>
      <body className="bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
