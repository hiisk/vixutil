import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '퇴직금 계산기 - 평균임금·재직기간 기준 법령 퇴직금 계산',
  description: '평균임금, 상여금, 연차수당을 반영한 법령 기준 퇴직금을 계산합니다. 1년 미만 재직자도 일할 계산을 지원합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
