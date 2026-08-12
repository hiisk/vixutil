import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '청년 목돈 마련 계좌 계산기 - 정부 기여금 포함 만기 수령액',
  description: '정부가 기여금을 얹어 주는 청년 적금의 만기 수령액을 계산합니다. 소득 구간별 기여금 비율·한도와 이자소득 비과세를 반영해 일반 적금과의 차액, 연 환산 수익률까지 함께 봅니다.',
  alternates: { canonical: '/calculator/youth-savings' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
