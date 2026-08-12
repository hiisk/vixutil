import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '연말정산 환급액 계산기 - 결정세액과 기납부세액 차액',
  description: '총급여와 공제 항목으로 결정세액을 내고, 회사가 매달 떼어 둔 기납부세액과 비교해 환급액인지 추가납부액인지 계산합니다. 근로소득공제·근로소득세액공제·자녀세액공제와 지방소득세까지 함께 봅니다.',
  alternates: { canonical: '/calculator/year-end-tax' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
