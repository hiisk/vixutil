import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '하루 물 섭취량 계산기 - 체중·활동량 기준 적정 수분량',
  description: '체중과 활동 수준을 입력하면 하루 적정 물 섭취량(ml)을 계산합니다. WHO 권장 기준 및 개인 맞춤 수분 섭취 가이드를 제공합니다.',
  alternates: { canonical: '/calculator/water' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
