import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '커피 비율 계산기 - 원두와 물 양 계산',
  description: '핸드드립·프렌치프레스·콜드브루·모카포트의 원두와 물 비율을 계산합니다. 원두 g에서 물 mL를, 물에서 원두를 양쪽으로 구합니다.',
  alternates: { canonical: '/calculator/coffee-ratio' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
