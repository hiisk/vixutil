import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '전기요금 계산기 - 사용량(kWh) 기준 전기세 계산',
  description: '월 전기 사용량(kWh)을 입력하면 한전 주택용 누진 요금제 기준 전기세와 부가세, 전력산업기반기금을 합산한 청구액을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
