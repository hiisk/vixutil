import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '환율 계산기 - 원화·달러·엔·유로 실시간 환산',
  description: '원화(KRW)와 달러(USD), 엔(JPY), 유로(EUR) 금액을 입력하면 현재 환율 기준으로 즉시 환산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
