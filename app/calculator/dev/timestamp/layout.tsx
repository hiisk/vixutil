import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '타임스탬프 변환기 - Unix 시간 ↔ 날짜 즉시 변환',
  description: 'Unix 타임스탬프(초/밀리초)를 날짜·시간 문자열로 변환하거나, 날짜를 Unix 타임스탬프로 변환합니다. 현재 타임스탬프도 즉시 확인할 수 있습니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
