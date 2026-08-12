import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '기초연금 수급 자격 계산기 - 소득인정액과 예상 수령액',
  description: '소득과 재산을 소득인정액으로 바꿔 선정기준액과 견줍니다. 재산이 얼마까지면 받을 수 있는지 되짚고, 부부 감액과 소득역전방지 감액을 적용한 월 수령액을 계산합니다.',
  alternates: { canonical: '/calculator/basic-pension' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
