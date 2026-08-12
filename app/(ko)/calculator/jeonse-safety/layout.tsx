import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '전세 보증금 안전도 계산기 - 깡통전세 판정과 떼일 금액',
  description: '시세·보증금·선순위 근저당과 낙찰가율을 넣으면 경매로 넘어갔을 때 떼일 금액을 계산합니다. 전세가율과 부채비율, 소액임차인 최우선변제, 안전해지는 최대 보증금까지 함께 봅니다.',
  alternates: { canonical: '/calculator/jeonse-safety' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
