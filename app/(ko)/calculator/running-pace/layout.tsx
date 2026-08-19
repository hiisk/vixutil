import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '러닝 페이스 계산기 - 목표 기록으로 km당 페이스 계산',
  description: '5K·10K·하프·마라톤 목표 기록을 넣으면 km당 페이스와 마일 페이스, 시속을 계산합니다. 5km마다 구간 통과 시각도 함께 나와 대회에서 지금 앞서는지 늦는지 바로 알 수 있습니다.',
  alternates: {
    canonical: '/calculator/running-pace',
    languages: alternateLanguages10('/calculator/running-pace'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
