import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '자동차 보험 할증 계산기 - 사고 후 3년 보험료와 자비 처리 비교',
  description: '사고 유형과 무사고 햇수를 넣으면 앞으로 3년간 더 낼 보험료를 계산합니다. 할증등급 몫과 무사고 할인 소멸 몫을 나눠 보여주고, 자비로 내는 편이 나은 손익분기 수리비까지 냅니다.',
  alternates: { canonical: '/calculator/car-insurance-surcharge' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
