import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '연봉 계산기 - 월급·상여금으로 연봉 환산',
  description: '월 기본급과 상여금 개월 수를 입력하면 연봉과 월 평균 급여를 계산합니다. 기타 수당도 포함하여 총 연간 보수를 산출합니다.',
  alternates: { canonical: '/calculator/to-annual' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
