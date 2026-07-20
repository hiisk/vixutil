import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '혈액형 운세 - A·B·O·AB형 오늘의 운세',
  description: 'A형·B형·O형·AB형별 오늘의 운세를 무료로 확인하세요. 연애운·금전운·직업운·건강운과 행운의 색·숫자까지 매일 새롭게 제공합니다.',
  alternates: { canonical: '/fortune/blood-type' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '혈액형 운세', path: '/fortune/blood-type' },
      ])} />
      {children}
    </>
  );
}
