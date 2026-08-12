import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '국민연금 분할연금 계산기 - 이혼 시 배우자 연금 분할액',
  description: '이혼할 때 나누는 국민연금 분할연금액을 계산합니다. 혼인 중 가입기간에 해당하는 노령연금의 절반이 기준이며, 나눠 준 쪽의 연금이 얼마 줄어드는지와 분할 비율별 금액을 함께 봅니다.',
  alternates: { canonical: '/calculator/pension-split' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
