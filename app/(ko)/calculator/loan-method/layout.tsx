import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '대출 상환방식 비교 계산기 - 원리금균등·원금균등·만기일시',
  description: '같은 금액을 빌려도 상환방식에 따라 총이자가 달라집니다. 원리금균등·원금균등·만기일시의 첫 달 부담과 총이자를 나란히 비교합니다.',
  alternates: {
    canonical: '/calculator/loan-method',
    languages: alternateLanguages10('/calculator/loan-method'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
