import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '부피무게 계산기 - 택배·항공 운임 무게 계산',
  description: '상자의 가로·세로·높이를 넣으면 부피무게를 계산하고, 실제 무게와 견주어 어느 쪽으로 요금이 매겨지는지 알려 줍니다. 항공 5000, 국내 택배 6000 계수를 지원합니다.',
  alternates: {
    canonical: '/calculator/volumetric-weight',
    languages: alternateLanguages10('/calculator/volumetric-weight'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
