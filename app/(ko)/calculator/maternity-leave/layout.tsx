import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '출산전후휴가 급여 계산기 - 90일·다태아 120일 수령액',
  description: '월 통상임금으로 출산전후휴가 90일(다태아 120일) 동안 받는 금액을 유급기간과 무급기간으로 나눠 계산합니다. 고용보험 상한·하한, 우선지원대상기업 여부, 유산·사산 휴가와 배우자 출산휴가까지 함께 봅니다.',
  alternates: { canonical: '/calculator/maternity-leave' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
