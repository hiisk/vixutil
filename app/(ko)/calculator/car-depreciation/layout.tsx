import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '자동차 감가상각 계산기 - 연식별 중고차 잔존가치',
  description: '구매가와 연 감가율을 넣으면 해마다 얼마가 남는지 표로 보여 줍니다. 값이 절반이 되는 해도 함께 계산합니다.',
  alternates: { canonical: '/calculator/car-depreciation' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
