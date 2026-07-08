import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '띠 운세 - 12띠별 오늘의 운세',
  description: '쥐띠부터 돼지띠까지 12띠별 오늘의 운세를 매일 무료로 확인하세요.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
