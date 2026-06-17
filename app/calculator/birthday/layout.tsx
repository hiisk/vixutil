import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '생일 계산기 - 다음 생일까지 남은 날수·요일 계산',
  description: '생년월일을 입력하면 다음 생일까지 남은 일수, 생일 요일, 살아온 날 수를 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
