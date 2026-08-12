import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '지역가입자 건강보험료 계산기 - 소득·재산 보험료와 직장가입자 비교',
  description: '퇴직·프리랜서·개인사업자의 지역가입자 건강보험료를 소득보험료·재산보험료·자동차보험료로 나눠 계산합니다. 장기요양보험료까지 더한 월 납부액을 같은 소득의 직장가입자와 나란히 견줍니다.',
  alternates: { canonical: '/calculator/health-insurance-local' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
