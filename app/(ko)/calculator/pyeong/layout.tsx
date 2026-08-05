import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '평수 계산기 - 제곱미터·평 상호 환산',
  description: '㎡(제곱미터)와 평(坪)을 상호 환산합니다. 전용면적·공급면적·계약면적 구분 설명과 함께 실평수 계산 방법을 안내합니다.',
  alternates: { canonical: '/calculator/pyeong' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
