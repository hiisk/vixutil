import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '국민연금 예상 수령액 계산기 - 가입기간·조기수령·연기연금',
  description: '국민연금법의 기본연금액 식으로 월 예상 연금을 계산합니다. 가입기간에 따른 지급률, 조기수령 감액(연 6%)과 연기연금 증액(연 7.2%), 둘의 손익분기 시점까지 함께 봅니다.',
  alternates: { canonical: '/calculator/national-pension' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
