import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '목표 실수령액 → 연봉 계산기 - 월 실수령 기준 필요 연봉 역산',
  description: '월 실수령액을 넣으면 필요한 연봉을 역산합니다. 4대보험과 소득세를 반영해 "월 300만원 받으려면 연봉 얼마?"에 답합니다. 이직·연봉 협상 기준.',
  alternates: { canonical: '/calculator/target-salary' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
