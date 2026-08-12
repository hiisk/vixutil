import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '연금소득세 계산기 - 공적연금·연금저축 세후 수령액',
  description: '국민연금 등 공적연금은 연금소득공제 뒤 종합과세하고, 연금저축·IRP는 나이별 저율 분리과세로 계산합니다. 연 1,500만원 문턱과 나눠 받을 때 줄어드는 세금까지 함께 봅니다.',
  alternates: { canonical: '/calculator/pension-tax' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
