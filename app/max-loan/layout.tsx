import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '최대 대출 가능액 계산기 - 소득 기준 한도 계산',
  description: '연소득과 희망 금리, 상환 기간을 입력하면 DTI·DSR 기준 최대 대출 가능 금액을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
