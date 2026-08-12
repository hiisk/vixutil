import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '태양광 발전 수익 계산기 - 설치비 회수 기간과 전기요금 절감액',
  description: '설치 용량과 실부담 설치비, 월 전기 사용량, 일일 발전시간을 넣으면 누진 구간을 반영한 연 절감액과 회수 기간을 계산합니다. 발전량 감소를 반영한 연도별 누적 절감액도 함께 봅니다.',
  alternates: { canonical: '/calculator/solar-payback' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
