import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '전월세 전환율 계산기 - 전세를 월세로 월세를 전세로 환산',
  description: '전세보증금이나 월세를 입력하면 법정 전월세전환율(5.5~6%) 기준으로 월세 또는 전세 보증금으로 환산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
