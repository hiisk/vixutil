/**
 * JSON-LD 구조화 데이터 삽입용 공통 컴포넌트.
 * 정적 export 환경에서도 안전하게 <script> 로 렌더된다.
 */
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

/** 사이트 전역 WebSite + 검색박스(사이트링크 검색) 구조화 데이터 */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "vixutil",
  alternateName: "빅스유틸",
  url: BASE,
  description:
    "계산기·운세·생성기·심리테스트·퀴즈·체크리스트 등 일상에 필요한 실용 유틸 모음",
  inLanguage: "ko-KR",
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
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
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
