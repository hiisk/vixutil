import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '배란일 계산기 - 마지막 생리일 기준 배란일·가임기 계산',
  description: '마지막 생리 시작일과 생리 주기를 입력하면 배란 예정일과 가임기간(배란일 ±5일)을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
