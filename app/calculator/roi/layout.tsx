import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '수익률 계산기 - 투자 원금 대비 손익·수익률 계산',
  description: '투자 원금과 현재가치(또는 수익금)를 입력하면 수익률(%)과 손익금액을 계산합니다. 연환산 수익률(CAGR)도 산출합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
