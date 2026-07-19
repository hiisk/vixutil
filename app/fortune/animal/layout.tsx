import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '띠 운세 - 12띠별 오늘의 운세',
  description: '쥐띠부터 돼지띠까지 12띠별 오늘의 운세를 매일 무료로 확인하세요.',
  alternates: { canonical: '/fortune/animal' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '띠 운세', path: '/fortune/animal' },
      ])} />
      {children}
    </>
  );
}
