import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '통상임금 계산기 - 기본급·고정수당 기준 통상시급 계산',
  description: '기본급과 직책수당·직무수당 등 고정수당을 합산하여 통상임금과 통상시급을 계산합니다. 연장·야간·휴일 수당 단가도 자동으로 산출합니다.',
  alternates: { canonical: '/calculator/standard-wage' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
