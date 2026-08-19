/**
 * 모든 언어가 함께 쓰는 <html> 껍데기.
 *
 * <html>은 **루트 레이아웃만** 그린다. 그래서 언어마다 lang을 맞추려면 언어별로
 * 루트 레이아웃이 하나씩 있어야 하고, 그러려면 app/ 아래를 route group으로
 * 갈라야 한다 — app/(ko), app/(en) … 처럼. 그룹은 주소에 안 나타나므로
 * /color와 /en/color는 그대로다.
 *
 * 전에는 빌드가 끝난 뒤 out/의 HTML을 문자열 치환해서 lang을 고쳤다
 * (scripts/fix-html-lang.mjs). ISR로 바꾸면서 낱장이 요청 때 만들어지므로
 * 그 방법이 더는 통하지 않는다 — 고칠 파일이 빌드 시점에 없다.
 *
 * **메타데이터는 여기 두지 않는다.** Next는 metadata를 layout.tsx·page.tsx에서만
 * 읽는다 — 이 파일은 그냥 컴포넌트라 여기 적으면 아무 일도 안 일어난다.
 * 실제로 app/layout.tsx에서 옮겨 올 때 딸려 와서, lib/site-metadata.ts와 같은
 * 내용이 두 벌로 한동안 있었다. 고치는 사람은 둘 중 아무거나 고치게 된다.
 */
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import JsonLd, { websiteJsonLd } from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import '@/app/globals.css';

/*
 * 라틴 글꼴 — 저장소에 심은 가변 woff2 한 벌(28.6KB, 라틴만).
 *
 * next/font/google를 안 쓴다. 그쪽은 빌드에서 구글 폰트로 나가는데, 이 저장소는
 * 카드 폰트를 받다가 ETIMEDOUT으로 빌드가 죽은 적이 있다(lib/og-image.ts).
 * 파일을 들고 있으면 빌드에 외부 의존이 없다.
 *
 * 한글은 일부러 안 싣는다 — 부분집합을 떠도 메가바이트 단위다. 한글은 시스템
 * 글꼴이 그리고, 라틴·숫자만 이 글꼴이 그린다.
 */
const geist = localFont({
  src: "../app/fonts/geist-var.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist",
});

// TODO: GA4 측정 ID를 입력하세요 (예: "G-XXXXXXXXXX"). 비워두면 GA 스크립트는 로드되지 않습니다.
const GA_MEASUREMENT_ID = "";


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

export default function RootShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={geist.variable} suppressHydrationWarning>
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
