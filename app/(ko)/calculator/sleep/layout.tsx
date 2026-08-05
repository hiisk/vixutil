import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '수면 계산기 - 기상 시간 기준 최적 취침 시간 계산',
  description: '기상 목표 시간을 입력하면 90분 수면 사이클 기준 최적 취침 시간을 계산합니다. 깊은 수면을 위한 권장 취침 시각 목록을 제공합니다.',
  alternates: { canonical: '/calculator/sleep' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
