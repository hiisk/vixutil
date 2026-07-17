import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '재산세 계산기 - 공시가격 기준 재산세 계산',
  description: '주택·건물의 공시가격(시가표준액)을 입력하면 재산세와 지역자원시설세, 지방교육세를 합산한 납부 세액을 계산합니다.',
  alternates: { canonical: '/calculator/property-tax' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
