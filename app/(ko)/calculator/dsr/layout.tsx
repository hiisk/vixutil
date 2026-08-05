import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'DSR 계산기 - 총부채원리금상환비율 계산',
  description: '연소득과 기존 대출 원리금, 신규 대출 원리금을 입력하면 DSR(총부채원리금상환비율)을 계산합니다. 금융기관 대출 심사 기준 40%(1금융권) 대비 확인.',
  alternates: { canonical: '/calculator/dsr' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
