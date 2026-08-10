import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '임대수익률 계산기 - 표면·실투자 대비 수익률',
  description: '매매가·보증금·월세에 대출과 부대비용을 넣으면 표면 수익률과 실투자 대비 수익률, 연 순수입, 원금 회수 기간을 함께 계산합니다. 레버리지 효과와 역레버리지까지 정직하게 보여줍니다.',
  alternates: {
    canonical: '/calculator/rental-yield',
    languages: alternateLanguages10('/calculator/rental-yield'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
