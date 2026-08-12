import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '기준 중위소득 계산기 - 복지 급여 자격과 내 소득 비율',
  description: '가구원 수별 기준 중위소득 고시액을 넣어 생계급여 32%·의료급여 40%·주거급여 48%·교육급여 50% 선정기준액을 내고, 내 소득인정액이 중위소득의 몇 %인지 되짚어 생계급여 차액까지 계산합니다.',
  alternates: { canonical: '/calculator/median-income' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
