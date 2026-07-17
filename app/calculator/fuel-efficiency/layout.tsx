import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '연비 계산기 - 주유량·주행거리로 연비·유류비 계산',
  description: '주유량(리터)과 주행 거리(km)를 입력하면 연비(km/L)와 월 평균 유류비를 계산합니다. 차량별 연비 비교도 지원합니다.',
  alternates: { canonical: '/calculator/fuel-efficiency' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
