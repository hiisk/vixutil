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

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
