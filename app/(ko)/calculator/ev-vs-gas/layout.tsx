import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '전기차 vs 내연차 유지비 비교 계산기 - 몇 년 타면 차값 차이를 뽑나',
  description: '전비와 연비, 충전 단가와 유가를 맞대어 연간 에너지비·자동차세·정비비 차이를 계산하고, 비싼 차값을 유지비로 회수하는 손익분기 연수와 보유 연수별 누적 총비용을 냅니다.',
  alternates: { canonical: '/calculator/ev-vs-gas' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
