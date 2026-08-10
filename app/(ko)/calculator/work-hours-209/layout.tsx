import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '소정근로시간 계산기 - 209시간과 통상시급',
  description: '주 근로시간으로 월 소정근로시간과 통상시급을 계산합니다. 209시간이 어떻게 나오는지, 연장·야간수당이 얼마인지 함께 봅니다.',
  alternates: { canonical: '/calculator/work-hours-209' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
