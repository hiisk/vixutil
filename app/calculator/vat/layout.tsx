import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '부가세 계산기 - 공급가액·부가가치세 10% 즉시 계산',
  description: '금액을 입력하면 공급가액과 부가가치세(10%)를 분리하거나, 공급가액에 부가세를 합산한 합계액을 계산합니다. 역산도 지원합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
