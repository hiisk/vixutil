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
    // apple-icon 규약은 svg를 지원하지 않는다. app/apple-icon.tsx가 PNG를 생성한다.
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

/**
 * 첫 페인트 전에 테마 클래스를 붙인다. React가 렌더한 뒤에 붙이면 어두운 테마
 * 사용자에게 흰 화면이 한 번 번쩍인다(FOUC). 그래서 동기 인라인 스크립트여야 한다.
 * 저장된 선택이 있으면 그것을, 없으면 시스템 설정을 따른다.
 */
const THEME_INIT = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var dark = t ? t === 'dark'
                 : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 다른 어떤 것보다 먼저 실행돼야 한다 — beforeInteractive로도 늦다 */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <meta name="google-site-verification" content="8aQBw8JhTs3guCPKFJPkPZezUI0sK3fxDS_j09tyHsE" />
        <meta name="naver-site-verification" content="24028bd1e68ef5dcf18517d8ecb1164938bd35ef" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7815102302386083"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <JsonLd data={websiteJsonLd} />
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
