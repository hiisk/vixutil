import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '난방비 계산기 - 지역난방 열량(Mcal) 기준 난방요금 계산',
  description: '계약면적과 사용열량, 고지서의 단가를 넣으면 기본요금·사용요금·부가세를 나눠 계산합니다. ㎡당·평당·하루 평균 난방비와 절약했을 때의 금액도 함께 봅니다.',
  alternates: { canonical: '/calculator/heating-bill' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
