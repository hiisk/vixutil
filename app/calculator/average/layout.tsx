import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '평균 계산기 - 평균·중앙값·최빈값·표준편차',
  description: '숫자를 넣으면 산술평균, 중앙값, 최빈값, 범위, 표본·모집단 표준편차를 한 번에 계산합니다. 쉼표·띄어쓰기·줄바꿈 어느 것으로 나눠도 됩니다.',
  alternates: { canonical: '/calculator/average' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
