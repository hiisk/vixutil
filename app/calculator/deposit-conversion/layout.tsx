import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '환산보증금 계산기 - 상가 임대차 보증금 + 월세×100 계산',
  description: '상가건물임대차보호법의 환산보증금(보증금 + 월세×100)을 계산하고 지역별 기준금액과 비교합니다. 기준을 넘지 않으려면 월세를 얼마까지 낮춰야 하는지도 알려줍니다.',
  alternates: { canonical: '/calculator/deposit-conversion' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
