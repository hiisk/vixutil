import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '차량 유지비 계산기 - 연간 유지비와 km당 비용',
  description: '연료비·자동차세·보험료·정비비를 넣으면 한 해 유지비와 월 평균, 1km당 비용을 계산합니다. 안 굴려도 나가는 고정비가 얼마인지 함께 봅니다.',
  alternates: {
    canonical: '/calculator/car-cost',
    languages: alternateLanguages10('/calculator/car-cost'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
