import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '예금 계산기 - 예치금·이율·기간으로 만기 수령액 계산',
  description: '예금 원금과 연이율, 예치 기간을 입력하면 만기 수령액과 이자소득세(15.4%) 공제 후 실수령액을 계산합니다.',
  alternates: { canonical: '/calculator/deposit' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
