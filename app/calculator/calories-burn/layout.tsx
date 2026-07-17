import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '운동 칼로리 소모 계산기 - MET 기반 운동별 칼로리 계산',
  description: '체중, 운동 종류, 운동 시간으로 MET 기반 칼로리 소모량을 계산합니다. 지방 소모량 및 음식 칼로리 비교 제공.',
  alternates: { canonical: '/calculator/calories-burn' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
