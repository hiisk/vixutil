import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '가전 전기요금 계산기 - 에어컨·건조기 켜면 얼마 더 나오나',
  description: '가전의 소비전력과 하루 사용 시간을 넣으면 한 달 전기 사용량과 요금이 얼마나 늘어나는지 계산합니다. 누진 구간을 넘기는지도 함께 봅니다.',
  alternates: { canonical: '/calculator/appliance-power' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
