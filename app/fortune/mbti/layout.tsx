import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'MBTI 운세 - 16가지 성격 유형별 오늘의 운세',
  description: '내 MBTI 유형에 맞는 오늘의 운세를 무료로 확인해보세요.',
  alternates: { canonical: '/fortune/mbti' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: 'MBTI 운세', path: '/fortune/mbti' },
      ])} />
      {children}
    </>
  );
}
