import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '연차 계산기 - 입사일로 연차 발생일수 계산 (근로기준법)',
  description: '입사일을 넣으면 근로기준법 제60조 기준 연차 유급휴가 일수를 계산합니다. 1년 미만 월 1일, 1년 이상 15일, 3년차부터 2년마다 1일 가산(최대 25일)을 반영합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
