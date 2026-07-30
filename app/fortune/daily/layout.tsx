import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '오늘의 종합운세 - 생년월일로 보는 오늘의 운세',
  description: '생년월일을 넣으면 오늘의 총운·연애·금전·직업·건강운과 행운의 색·숫자를 알려드립니다. 매일 새롭게 갱신되는 오늘의 종합운세.',
  alternates: {
    canonical: '/fortune/daily',
    languages: { 'ko': '/fortune/daily', 'en': '/en/fortune/daily', 'x-default': '/en/fortune/daily' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '오늘의 종합운세', path: '/fortune/daily' },
      ])} />
      {children}
    </>
  );
}
