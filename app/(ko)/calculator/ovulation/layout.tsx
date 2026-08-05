import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '배란일 계산기 - 마지막 생리일 기준 배란일·가임기 계산',
  description: '마지막 생리 시작일과 생리 주기를 입력하면 배란 예정일과 가임기간(배란일 ±5일)을 계산합니다.',
  alternates: {
    canonical: '/calculator/ovulation',
    languages: alternateLanguages10('/calculator/ovulation'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
