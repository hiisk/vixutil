import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '더치페이 계산기 - 인원별 정확한 금액 분배',
  description: '총 금액과 인원수, 개인 추가 항목을 입력하면 각자 부담할 금액을 정확하게 계산합니다.',
  alternates: { canonical: '/calculator/dutch-pay' },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
