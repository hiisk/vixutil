import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '시급 계산기 - 월급을 시급으로 환산',
  description: '월급과 주 소정근로시간을 입력하면 시급과 일급을 환산합니다. 2026년 최저시급 10,320원 대비 비교도 제공합니다.',
  alternates: { canonical: '/calculator/to-hourly' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
