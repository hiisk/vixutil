import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '자동차 리스·할부·현금 비교 계산기 - 방식별 총비용',
  description: '같은 차를 현금·할부·리스로 살 때 정해진 기간의 총비용을 맞대어 봅니다. 기간 말 잔존가치와 현금의 기회비용까지 넣어 세므로 월 납입액만 보는 비교와 답이 달라집니다.',
  alternates: { canonical: '/calculator/car-lease-vs-loan' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
