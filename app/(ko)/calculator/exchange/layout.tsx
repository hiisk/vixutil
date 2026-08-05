import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '환율 계산기 - 원화·달러·엔·유로 실시간 환산',
  description: '원화(KRW)와 달러(USD), 엔(JPY), 유로(EUR) 금액을 입력하면 현재 환율 기준으로 즉시 환산합니다.',
  alternates: {
    canonical: '/calculator/exchange',
    languages: alternateLanguages10('/calculator/exchange'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
