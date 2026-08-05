import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '최저시급 계산기 - 2026년 최저시급 10,320원 월급 환산',
  description: '2026년 최저시급 10,320원 기준으로 주 근무시간에 따른 월급, 연봉을 계산합니다. 주휴수당 포함 월 소정근로시간 자동 적용.',
  alternates: { canonical: '/calculator/minimum-wage' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
