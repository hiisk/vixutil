import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '자동차 취등록세 계산기 - 차값 외 추가 비용 계산',
  description: '차량 가격과 차종을 넣으면 취득세(승용 7%·경차 4%·승합 5%)와 공채 매도 손실, 등록 실비를 합해 차값 외에 실제로 더 나가는 금액을 계산합니다. 경차 감면도 반영합니다.',
  alternates: { canonical: '/calculator/car-registration' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
