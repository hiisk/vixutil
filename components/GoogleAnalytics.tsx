import Script from 'next/script';

/**
 * GA4 측정 스크립트. gaId가 비어 있으면 아무것도 렌더하지 않는다.
 * 정적 export 환경이므로 next/script(afterInteractive)로 클라이언트에서 로드된다.
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');

          /*
            ── 제휴 클릭 추적을 지웠다 (2026-08-20) ──────────────
            코인 거래소 제휴를 걷어내면서 data-ref-sub를 남기던 카드가 없어졌다.
            지금 광고는 쿠팡 파트너스 캐러셀 하나뿐이고, 그쪽은 iframe 안이라
            우리 쪽에서 클릭을 볼 수 없다 — 실적은 쿠팡 파트너스 대시보드에서
            본다. 남겨 두면 아무 <a>에도 안 걸리는 리스너만 매 화면에 붙는다.
          */
          });
        `}
      </Script>
    </>
  );
}
