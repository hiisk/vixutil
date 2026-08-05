import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '기초대사량 계산기 - BMR·TDEE 및 목적별 칼로리 계산',
  description: '성별·나이·신장·체중으로 기초대사량(BMR)을 계산하고, 활동 수준에 따른 총 에너지 소비량(TDEE)과 다이어트·증량 권장 칼로리를 산출합니다.',
  alternates: { canonical: '/calculator/bmr' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
