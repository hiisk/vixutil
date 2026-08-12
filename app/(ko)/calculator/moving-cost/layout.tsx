import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '이사 비용 계산기 - 포장이사 견적 항목별 계산',
  description: '평수·이사 종류·거리·층수에 사다리차와 에어컨 탈부착, 폐기물 처리, 부가세까지 항목별로 벌려 이사비 합계를 냅니다. 업체 견적서에서 빠진 항목이 있는지 짚어 보세요.',
  alternates: { canonical: '/calculator/moving-cost' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
