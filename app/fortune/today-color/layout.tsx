import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '오늘의 행운 색 - 매일 바뀌는 나의 행운 컬러',
  description: '이름을 넣으면 오늘 당신에게 힘이 되는 행운의 색과 그 의미, 활용 팁, 피하면 좋은 색까지 알려드립니다. 매일 자정 새로 바뀝니다. 재미·참고용.',
  alternates: {
    canonical: '/fortune/today-color',
    languages: { 'ko': '/fortune/today-color', 'en': '/en/fortune/today-color', 'zh': '/zh/fortune/today-color', 'x-default': '/en/fortune/today-color' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '오늘의 행운 색', path: '/fortune/today-color' },
      ])} />
      {children}
    </>
  );
}
