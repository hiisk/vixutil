import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '부의금(조의금) 계산기 - 관계별 3·5·7·10만원 어디쯤',
  description: '부의금·조의금은 법도 고시도 없는 관습입니다. 관계와 왕래의 깊이, 직접 조문하는지, 함께 가는 인원, 전에 받은 부조를 넣으면 3·5·7·10만원 같은 관습 단위로 권하는 범위를 좁혀 드립니다. 4가 들어간 금액을 피하는 까닭과 봉투 앞면에 쓰는 부의·근조 표기도 함께 정리했습니다.',
  alternates: { canonical: '/calculator/condolence-money' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
