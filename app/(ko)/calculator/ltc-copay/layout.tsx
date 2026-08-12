import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '장기요양 본인부담금 계산기 - 재가·시설 급여와 한도 초과분',
  description: '노인장기요양보험 급여를 쓸 때 내는 본인부담금을 계산합니다. 재가급여 15%·시설급여 20%에 감경을 반영하고, 월 한도액을 넘겨 전액 부담하는 금액과 식사재료비 등 비급여까지 더해 한 달 총액을 냅니다.',
  alternates: { canonical: '/calculator/ltc-copay' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
