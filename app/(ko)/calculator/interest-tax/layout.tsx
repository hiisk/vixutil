import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '이자소득세 계산기 - 예금 이자 세금·세후 실수령',
  description: '예금·적금 이자에서 떼는 15.4%(소득세 14% + 지방소득세 1.4%) 세금과 세후 실수령액을 계산합니다. 이자 금액으로도, 원금·금리·기간으로도 계산할 수 있고 금융소득 종합과세 기준도 안내합니다.',
  alternates: { canonical: '/calculator/interest-tax' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
