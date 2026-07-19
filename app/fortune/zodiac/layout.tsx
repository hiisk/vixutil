import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '별자리 운세 - 12개 별자리 오늘의 운세',
  description: '양자리부터 물고기자리까지 12개 별자리별 오늘의 운세를 매일 무료로 확인하세요.',
  alternates: { canonical: '/fortune/zodiac' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '별자리 운세', path: '/fortune/zodiac' },
      ])} />
      {children}
    </>
  );
}
