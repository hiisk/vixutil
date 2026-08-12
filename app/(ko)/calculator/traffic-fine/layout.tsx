import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '교통 범칙금·과태료 계산기 - 속도위반 벌점과 면허정지 계산',
  description: '속도위반·신호위반의 범칙금과 과태료를 초과 속도 구간별로 계산하고, 어느 쪽으로 내는 것이 유리한지 벌점까지 넣어 비교합니다. 누산 벌점으로 면허정지 일수, 사전납부 감액과 가산금도 함께 봅니다.',
  alternates: { canonical: '/calculator/traffic-fine' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
