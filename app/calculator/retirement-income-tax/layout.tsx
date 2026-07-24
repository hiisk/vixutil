import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '퇴직소득세 계산기 - 퇴직금 세금·세후 실수령액',
  description: '퇴직금과 근속연수를 넣으면 근속연수공제·환산급여·누진세율을 거쳐 퇴직소득세와 지방소득세, 세후 실수령액을 계산합니다. 오래 일할수록 세부담이 낮아지는 연분연승 방식을 반영합니다.',
  alternates: { canonical: '/calculator/retirement-income-tax' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
