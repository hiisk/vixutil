import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '유족연금 계산기 - 가입기간별 지급률과 중복급여 조정',
  description: '국민연금 가입자가 숨졌을 때 유족이 받는 연금을 계산합니다. 가입기간에 따른 지급률(40·50·60%)과, 본인 노령연금이 있을 때 어느 쪽을 골라야 유리한지 갈림길까지 함께 봅니다.',
  alternates: { canonical: '/calculator/survivor-pension' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
