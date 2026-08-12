import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '월세 세액공제 계산기 - 총급여 구간별 공제율·결정세액 한도',
  description: '한 해 낸 월세와 총급여로 연말정산 월세 세액공제액을 계산합니다. 총급여 구간에서 공제율이 절벽처럼 갈리는 지점, 연 한도를 넘겨 버려지는 월세, 결정세액이 모자라 사라지는 공제액까지 보여주고 현금영수증 소득공제로 돌렸을 때와 나란히 견줍니다.',
  alternates: { canonical: '/calculator/monthly-rent-deduction' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
