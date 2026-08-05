import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '수도요금 계산기 - 사용량(톤) 기준 상수도 요금 계산',
  description: '월 수도 사용량(톤)을 입력하면 구경별 기본요금과 사용량 요금, 하수도 요금을 합산한 상수도 요금을 계산합니다.',
  alternates: { canonical: '/calculator/water-bill' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
