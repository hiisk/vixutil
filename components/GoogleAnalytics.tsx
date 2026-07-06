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
        `}
      </Script>
    </>
  );
}
