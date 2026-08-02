import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import CalculatorHub from '@/components/CalculatorHub';
import { CATS } from '@/lib/calculator-catalog';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';

/**
 * 화면은 CalculatorHub(클라이언트)가 그린다. 이 파일이 서버 컴포넌트인 이유는
 * metadata를 내보내기 위해서다 — 'use client' 페이지에서는 export할 수 없다.
 *
 * canonical은 여기 둔다. app/calculator/layout.tsx에 넣으면 하위 계산기 97개가
 * 전부 이 레이아웃을 상속해 /calculator를 정본으로 가리키게 된다 — 그러면
 * 계산기 페이지들이 색인에서 통째로 빠진다. languages도 같은 이유로 여기 있다.
 *
 * 짝은 /{언어}/calculator다. 예전에는 /calculator/en·/calculator/ja를 가리켰는데,
 * 그 둘은 한국 계산기를 영어·일본어로 안내하는 별도 페이지지 이 허브의 번역판이
 * 아니다. 한쪽만 가리키면 구글은 그 hreflang 묶음을 통째로 무시한다.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: '/calculator',
    languages: alternateLanguages10('/calculator'),
  },
};

export default function Page() {
  const calcs = CATS.flatMap(c => c.calcs).map(c => ({ name: c.title, path: c.href }));
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '계산기', path: '/calculator' },
        ])}
      />
      <JsonLd data={itemListJsonLd('실생활 계산기', '/calculator', calcs)} />
      <CalculatorHub />
    </>
  );
}
