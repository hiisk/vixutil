import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '실업급여 계산기 - 구직급여 예상 수령액·수급 기간 계산',
  description: '평균임금과 고용보험 가입기간, 연령을 넣으면 구직급여 1일 지급액과 총 수령액, 소정급여일수를 계산합니다. 상·하한액을 반영한 예상액입니다.',
  alternates: { canonical: '/calculator/unemployment' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
