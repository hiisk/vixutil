import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '집 살 때 부대비용 계산기 - 취득세·중개보수·이사비 총 필요자금',
  description: '집값 외에 더 드는 돈을 한 번에 봅니다. 취득세·지방교육세·농어촌특별세에 중개보수, 인지세, 국민주택채권 매도손실, 법무사 보수, 이사비, 인테리어, 대출 부대비용을 합쳐 부대비용 합계와 집값 대비 비율, 총 필요자금을 계산합니다.',
  alternates: { canonical: '/calculator/home-buying-cost' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
