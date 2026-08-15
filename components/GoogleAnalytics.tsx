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
            제휴 클릭에 sub-id를 실어 보낸다 (2026-08-15).
            거래소 두 곳 다 링크에 붙이는 sub-id 파라미터를 지원하지 않는다
            (까닭은 lib/referral.ts의 각 거래소 주석). 그래서 어느 언어·어느
            섹션이 클릭을 만드는지는 우리 GA에서 본다 — 카드가 <a>에 남긴
            data-ref-sub를 읽어 referral_click 이벤트 하나로 보낸다.
            위임 리스너 하나뿐이라 카드가 몇 장이든 붙는 것이 없다.
          */
          document.addEventListener('click', function (e) {
            var a = e.target && e.target.closest ? e.target.closest('a[data-ref-sub]') : null;
            if (!a) return;
            gtag('event', 'referral_click', {
              referral_id: a.getAttribute('data-ref-id'),
              sub_id: a.getAttribute('data-ref-sub'),
            });
          });
        `}
      </Script>
    </>
  );
}
