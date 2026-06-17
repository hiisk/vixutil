import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '지방소득세 계산기 - 소득세의 10% 지방소득세 계산',
  description: '근로소득세 또는 종합소득세 금액을 입력하면 지방소득세(소득세의 10%)를 계산합니다. 소득세와 지방소득세 합계 세부담도 확인할 수 있습니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
