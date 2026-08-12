import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '신용카드 소득공제 계산기 - 총급여 25% 문턱·한도·절세액',
  description: '총급여의 25%를 넘게 쓴 금액만 공제됩니다. 신용카드·체크카드·현금영수증·전통시장·대중교통 사용액을 넣어 공제 대상 금액과 한도 적용 후 공제액, 그 공제로 실제 줄어드는 세금까지 계산합니다.',
  alternates: { canonical: '/calculator/card-deduction' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
