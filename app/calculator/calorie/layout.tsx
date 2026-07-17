import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '칼로리 계산기 - 음식별 칼로리 및 일일 권장 섭취량',
  description: '음식 종류와 섭취량을 입력하면 칼로리를 계산합니다. 체중·활동량 기반 하루 권장 칼로리와 대비도 확인할 수 있습니다.',
  alternates: { canonical: '/calculator/calorie' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
