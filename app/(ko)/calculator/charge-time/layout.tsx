import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '충전 시간 계산기 - mAh·W로 완충 시간',
  description: '배터리 용량(mAh·Wh)과 충전기 출력(W)으로 충전 시간을 계산합니다. 유선·무선 효율 차이와 80% 이후 느려지는 CV 구간을 나눠 보여 줍니다.',
  alternates: { canonical: '/calculator/charge-time' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
