import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '퇴직금 일시금 vs 연금 비교 계산기 - 어느 쪽이 유리한가',
  description: '퇴직금을 일시금으로 받을 때와 IRP에서 연금으로 나눠 받을 때의 세후 금액을 견줍니다. 연금수령 10년 이내 30%, 11년째부터 40% 감액되는 퇴직소득세와 운용수익에 붙는 연금소득세까지 넣어 두 선택의 차액과 월 수령액을 계산합니다.',
  alternates: { canonical: '/calculator/severance-vs-pension' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
