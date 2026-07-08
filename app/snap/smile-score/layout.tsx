import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '미소 지수 측정 - 내 미소 점수는',
  description: '사진 한 장으로 입꼬리 위치를 실측해 미소 지수를 측정해보세요.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
