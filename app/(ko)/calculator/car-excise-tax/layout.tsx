import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '자동차 개별소비세 계산기 - 출고가에 든 세금 역산',
  description: '공장도가에 개별소비세(기본 5%)·교육세(개소세의 30%)·부가세 10%가 층으로 얹혀 출고가가 됩니다. 출고가만 넣어 그 안에 든 세금을 되짚고, 세율이 3.5%로 내려갈 때 얼마 싸지는지 감면 한도까지 반영해 계산합니다.',
  alternates: { canonical: '/calculator/car-excise-tax' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
