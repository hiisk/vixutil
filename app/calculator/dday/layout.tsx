import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'D-Day 계산기 - 날짜 간 남은 일수·경과 일수 계산',
  description: '시작일과 목표일을 선택하면 D-Day(남은 날수) 또는 경과 일수를 계산합니다. 기념일, 시험, 이벤트까지의 일수를 한번에 확인합니다.',
  alternates: { canonical: '/calculator/dday' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
