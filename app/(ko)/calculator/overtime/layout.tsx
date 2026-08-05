import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '야근수당 계산기 - 연장·야간·휴일 근로수당 계산',
  description: '통상시급을 기준으로 연장근로(1.5배), 야간근로(0.5배 가산), 휴일근로(1.5배) 수당을 각각 계산합니다.',
  alternates: { canonical: '/calculator/overtime' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
