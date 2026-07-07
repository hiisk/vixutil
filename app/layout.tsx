import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import JsonLd, { websiteJsonLd } from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

// TODO: GA4 측정 ID를 입력하세요 (예: "G-XXXXXXXXXX"). 비워두면 GA 스크립트는 로드되지 않습니다.
const GA_MEASUREMENT_ID = "";

export const metadata: Metadata = {
  metadataBase: new URL("https://vixutil.com"),
  title: { default: "vixutil", template: "%s | vixutil" },
  description: "계산기·운세·생성기·심리테스트·퀴즈 등 일상 유틸 모음 — vixutil.com",
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
        <JsonLd data={websiteJsonLd} />
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
