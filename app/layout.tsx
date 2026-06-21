import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "vixutil", template: "%s | vixutil" },
  description: "계산기·심리테스트 등 실용 도구 모음 — vixutil.com",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="8aQBw8JhTs3guCPKFJPkPZezUI0sK3fxDS_j09tyHsE" />
        <meta name="naver-site-verification" content="24028bd1e68ef5dcf18517d8ecb1164938bd35ef" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7815102302386083"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-slate-50 text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
