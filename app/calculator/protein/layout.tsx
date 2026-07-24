import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '단백질 섭취량 계산기 - 하루 권장 단백질량',
  description: '체중과 활동 수준을 넣으면 하루 권장 단백질 섭취량을 범위로 계산합니다. 좌식 0.8g/kg부터 근육 증가 2.2g/kg까지 목표별로 다르게, 끼니당 참고량과 음식 환산도 함께 보여줍니다.',
  alternates: { canonical: '/calculator/protein' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
