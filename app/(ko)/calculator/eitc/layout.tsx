import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '근로장려금 계산기 - 자녀장려금까지 산정식으로 계산',
  description: '가구 유형과 총급여액 등을 점증·정액·점감 세 구간의 산정식에 넣어 근로장려금과 자녀장려금을 함께 계산합니다. 재산 절반 감액과 기한 후 신청 감액도 함께 봅니다.',
  alternates: { canonical: '/calculator/eitc' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
