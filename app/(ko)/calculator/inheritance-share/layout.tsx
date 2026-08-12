import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '법정상속분 계산기 - 배우자·자녀 상속 비율과 유류분',
  description: '민법이 정한 법정상속분을 상속인 구성별로 계산합니다. 상속 순위, 배우자 1.5배 가산, 대습상속을 반영해 각자의 몫과 금액을 내고 유류분(법정상속분의 1/2·1/3)까지 함께 봅니다.',
  alternates: { canonical: '/calculator/inheritance-share' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
