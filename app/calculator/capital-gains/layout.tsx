import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '양도소득세 계산기 - 부동산·주식 양도차익 세금 계산',
  description: '부동산 또는 주식의 양도가액과 취득가액을 입력하면 필요경비·장기보유특별공제를 반영한 양도소득세를 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
