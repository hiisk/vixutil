import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '전역일 계산기 - 입대일로 전역일과 남은 날짜 계산',
  description: '입대일과 군별을 넣으면 전역일, 남은 일수, 복무 진행률, 진급 예정일을 계산합니다. 육군·해병대 18개월, 해군 20개월, 공군 21개월 기준입니다.',
  alternates: { canonical: '/calculator/discharge' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
