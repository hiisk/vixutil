import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '건강보험 피부양자 자격 계산기 - 소득·재산 기준 2026',
  description: '합산소득 2,000만원, 재산세 과세표준 5.4억, 사업자등록 세 기준을 한 번에 대 보고 피부양자 자격 유지 여부를 확인합니다. 걸린 항목이 얼마나 넘었는지까지 알려드립니다.',
  alternates: { canonical: '/calculator/health-insurance-dependent' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
