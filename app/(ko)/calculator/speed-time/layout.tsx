import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '속도 거리 시간 계산기 - 셋 중 둘로 나머지 구하기',
  description: '거리·속도·시간 중 둘을 넣으면 나머지 하나를 계산합니다. km/h, m/s, mph, 달리기 페이스(분/km)로 함께 보여 줍니다.',
  alternates: { canonical: '/calculator/speed-time' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
