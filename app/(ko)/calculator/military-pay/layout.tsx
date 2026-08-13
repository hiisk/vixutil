import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '군인 월급 계산기 - 병사 봉급 총액과 장병내일준비적금 목돈',
  description: '군별 복무기간으로 이등병·일병·상병·병장 계급별 봉급과 총액을 계산하고, 장병내일준비적금 납입액에 정부 매칭지원금과 이자를 더해 전역 때 받는 목돈까지 함께 봅니다.',
  alternates: { canonical: '/calculator/military-pay' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
