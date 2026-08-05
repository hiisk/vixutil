import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '축의금 계산기 - 관계·참석 여부별 적정 축의금 가이드',
  description: '관계, 참석 여부, 예식장 급을 선택하면 통상적으로 오가는 축의금 금액대를 참고용으로 안내합니다.',
  alternates: { canonical: '/calculator/wedding-gift' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
