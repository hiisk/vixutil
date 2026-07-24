import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '전세 월세 유불리 계산기 - 어느 쪽이 이득일까',
  description: '전세보증금·월세·자금비용률을 넣으면 두 방식의 연간 실비용을 비교해 어느 쪽이 유리한지 알려줍니다. 손익분기 금리로 지금 예금금리와 바로 견줄 수 있습니다.',
  alternates: { canonical: '/calculator/jeonse-wolse' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
