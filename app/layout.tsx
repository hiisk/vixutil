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
 * 첫 페인트 전에 테마 클래스를 붙인다. React가 렌더한 뒤에 붙이면 화면이 한 번
 * 번쩍인다(FOUC). 그래서 동기 인라인 스크립트여야 한다.
 *
 * 기본은 라이트다. 시스템 설정(prefers-color-scheme)을 따르지 않는다 —
 * 이 사이트는 구글 자동 광고를 싣는데 광고는 흰 배경으로 렌더돼서, 시스템이
 * 다크인 사용자에게 검은 페이지 위에 흰 광고 블록이 박히는 그림이 된다.
 * 광고의 색은 우리가 못 바꾸므로 페이지를 밝게 두는 편이 낫다.
 *
 * 다크는 사용자가 직접 켤 때만 적용하고, 그 선택은 localStorage에 남는다.
 */
const THEME_INIT = `
(function(){
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
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
