/**
 * 사이트 전역 메타데이터 — 열 그룹의 루트 레이아웃이 함께 쓴다.
 *
 * 전에는 app/layout.tsx에 있었다. <html lang>을 언어별로 주려고 루트를 route
 * group으로 갈랐는데(app/(ko)…), 그러면 이 값도 그룹마다 있어야 한다.
 * 열 번 적으면 한 곳만 고치는 실수가 생기므로 여기 한 번만 둔다.
 *
 * metadataBase를 빠뜨리면 canonical과 og:url이 "/altitude"처럼 상대주소로
 * 나간다 — 빌드는 통과하고 검색엔진만 헷갈린다. 실제로 한 번 그렇게 나갔다.
 */
import type { Metadata, Viewport } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://vixutil.com"),
  title: { default: "vixutil", template: "%s | vixutil" },
  description: "계산기·운세·생성기·심리테스트·퀴즈 등 일상 유틸 모음 — vixutil.com",
  /*
    og:title·og:description·og:image는 Next가 각 페이지의 title/description과
    opengraph-image 규약에서 자동으로 채운다. 여기서는 자동으로 안 채워지는
    것들 — 사이트명, 타입, 로케일 — 만 전역 기본값으로 둔다.
    하위 페이지가 openGraph를 따로 선언하면 이 값이 통째로 대체되므로,
    선언할 일이 생기면 siteName·locale을 같이 적어야 한다.
  */
  openGraph: {
    type: "website",
    siteName: "vixutil",
    locale: "ko_KR",
  },
  /*
   * 구글 서치 콘솔 소유권 확인 (2026-08-21).
   *
   * <meta name="google-site-verification">로 나가고, 열 언어 루트가 이 값을
   * 함께 쓰므로 모든 장에 붙는다. 구글은 첫 장 하나만 봐도 되지만, 어느 장에
   * 붙었는지 신경 쓸 일이 없는 편이 낫다.
   *
   * ── 이 방식이 통하는 속성은 «URL 접두어»다 ──────────────────
   * 서치 콘솔에는 속성이 두 가지다. **도메인 속성**(vixutil.com)은 DNS TXT
   * 레코드로만 확인되고 메타 태그를 안 본다 — 그쪽은 코드가 아니라 Vercel의
   * DNS 설정에서 해야 한다(네임서버가 ns1/ns2.vercel-dns.com이다).
   * **URL 접두어 속성**(https://vixutil.com)은 이 메타 태그로 확인된다.
   *
   * 확인이 끝나도 지우지 않는다 — 지우면 구글이 소유권을 잃은 것으로 보고
   * 속성을 떼어 낸다. 색인이 통째로 빠지는 실수라 그때 알아채기 어렵다.
   */
  verification: {
    google: "8aQBw8JhTs3guCPKFJPkPZezUI0sK3fxDS_j09tyHsE",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    /*
     * apple-icon 규약은 svg를 지원하지 않아 PNG여야 한다.
     *
     * 전에는 app/apple-icon.tsx가 next/og로 그려 냈다. 그런데 route group으로
     * 가르면서 그 파일이 app/(ko)/ 안으로 들어갔고, 주소가 404가 됐다 —
     * 모든 페이지가 없는 아이콘을 가리킨 채 빌드는 통과했다. 열어 보기 전에는
     * 모르는 종류의 고장이고, 실제로 두 번째다.
     *
     * 그래서 그려 내지 않고 **파일로 둔다**(app/apple-icon.png). 그림은 icon.svg와
     * 같다. 라우트가 아니므로 그룹에 휩쓸릴 일이 없고 빌드도 아무것도 안 한다.
     */
    apple: [
      { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  },
};

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
