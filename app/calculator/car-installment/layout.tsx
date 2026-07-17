import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '자동차 할부 계산기 - 차량 가격·기간별 월 납입금 계산',
  description: '차량 구매가격, 선수금, 할부 기간, 이자율을 입력하면 월 할부금과 총 이자를 계산합니다. 잔존가치 할부(풍선형) 방식도 지원합니다.',
  alternates: { canonical: '/calculator/car-installment' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
