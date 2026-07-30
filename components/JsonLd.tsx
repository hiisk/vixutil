/**
 * JSON-LD 구조화 데이터 삽입용 공통 컴포넌트.
 * 정적 export 환경에서도 안전하게 <script> 로 렌더된다.
 */
import { LOCALES } from '@/lib/locales';

export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // 구조화 데이터는 신뢰된 정적 데이터만 넣는다.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE = "https://vixutil.com";

/**
 * 경로에서 언어를 읽는다.
 *
 * 세 헬퍼가 inLanguage에 "ko-KR"을 박고 있었다. 한국어만 있을 때는 맞았지만
 * 언어가 여덟 개가 되면서 스페인어·일본어 페이지가 전부 한국어로 신고됐다.
 * 호출하는 곳이 115군데라 인자를 늘리는 대신 경로에서 읽는다 — 경로에 이미
 * /es, /pt-br처럼 언어가 들어 있으니 따로 넘길 것이 없다.
 */
function langOf(path: string): string {
  const seg = path.split('/').filter(Boolean)[0];
  // 긴 접두어부터 본다. pt-br이 pt보다 먼저 걸려야 한다
  const hit = [...LOCALES]
    .filter(l => l.path !== '')
    .sort((a, b) => b.path.length - a.path.length)
    .find(l => seg === l.path);
  return hit ? hit.tag : 'ko-KR';
}

/** 무료라 값은 0이지만, 통화가 없으면 Offer가 불완전해진다 */
function currencyOf(path: string): string {
  return langOf(path) === 'ko-KR' ? 'KRW' : 'USD';
}

/** 사이트 전역 WebSite + 검색박스(사이트링크 검색) 구조화 데이터 */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "vixutil",
  alternateName: "빅스유틸",
  url: BASE,
  description:
    "계산기·운세·생성기·심리테스트·퀴즈·체크리스트 등 일상에 필요한 실용 유틸 모음",
  // 이 객체는 app/layout.tsx에 있어 여덟 언어 페이지에 모두 실린다. 사이트 전체를
  // 가리키는 항목이라 언어도 하나가 아니라 전부 적는다 — "ko-KR" 하나만 두면
  // 스페인어 페이지가 자기 <html lang="es">와 반대되는 신고를 같이 내보낸다.
  inLanguage: LOCALES.map(l => l.tag),
  publisher: {
    "@type": "Organization",
    name: "vixutil",
    url: BASE,
    logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
  },
};

/** 빵부스러기(breadcrumb) 구조화 데이터 생성 헬퍼 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
}

/** 계산기 등 웹 도구용 SoftwareApplication 구조화 데이터 */
export function webAppJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${BASE}${path}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    inLanguage: langOf(path),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: currencyOf(path) },
  };
}

/**
 * 허브(목록) 페이지용 CollectionPage + ItemList 구조화 데이터.
 *
 * 허브는 링크만 잔뜩 있는 화면이라 크롤러가 "이 페이지의 본체가 무엇인가"를
 * 잡기 어렵다. 목록 자체가 본체라고 명시하고 항목을 순서대로 넘겨준다.
 */
export function itemListJsonLd(
  name: string,
  path: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${BASE}${path}`,
    inLanguage: langOf(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: `${BASE}${it.path}`,
      })),
    },
  };
}

/** FAQ 구조화 데이터 생성 헬퍼 */
export function faqJsonLd(qas: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };
}
