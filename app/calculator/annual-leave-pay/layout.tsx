import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '연차수당 계산기 - 미사용 연차 수당 금액 계산',
  description: '월급과 미사용 연차 일수를 입력하면 연차수당 금액을 계산합니다. 통상임금 기준 연차수당 산정 방법을 적용합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
