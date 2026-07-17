import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '배당금 계산기 - 주식 보유 수량·배당수익률로 배당금 계산',
  description: '주식 보유 수량과 주가, 배당수익률(또는 주당 배당금)을 입력하면 연간·분기 배당금과 세후 실수령 배당금을 계산합니다.',
  alternates: { canonical: '/calculator/dividend' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
