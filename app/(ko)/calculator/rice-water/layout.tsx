import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '밥물 계산기 - 백미·현미·잡곡·죽 물 양',
  description: '쌀 양에 맞는 물 양을 계산합니다. 백미 1.2배·현미 1.5배·잡곡 1.3배·죽 5배 기준이며 밥솥 계량컵 180mL로 셈합니다.',
  alternates: { canonical: '/calculator/rice-water' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
