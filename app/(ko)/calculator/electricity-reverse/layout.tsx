import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '전기요금 역산 계산기 - 요금으로 사용량(kWh) 되찾기',
  description: '고지서 금액을 넣으면 몇 kWh를 썼는지, 어느 누진 구간인지, 다음 구간까지 얼마나 남았는지 계산합니다.',
  alternates: { canonical: '/calculator/electricity-reverse' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
