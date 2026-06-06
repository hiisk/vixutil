import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '목표금액 계산기 - 목표 달성 월 납입금·기간 역산',
  description: '목표 금액과 연이율을 입력하면 목표 달성에 필요한 월 납입금 또는 기간을 역산합니다. 복리 계산 기반의 재무 목표 플래너입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
