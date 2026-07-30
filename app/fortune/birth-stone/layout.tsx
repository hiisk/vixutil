import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '탄생석·탄생화 - 월별 보석과 꽃, 의미',
  description: '태어난 달을 선택하면 그 달의 탄생석과 탄생화, 각각의 의미와 꽃말을 알려드립니다. 1월 가넷부터 12월 터키석까지 월별 보석과 꽃 정보.',
  alternates: {
    canonical: '/fortune/birth-stone',
    languages: { 'ko': '/fortune/birth-stone', 'en': '/en/fortune/birth-stone', 'x-default': '/en/fortune/birth-stone' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '탄생석·탄생화', path: '/fortune/birth-stone' },
      ])} />
      {children}
    </>
  );
}
