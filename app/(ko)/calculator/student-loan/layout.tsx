import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '학자금 대출 상환 계산기 - 취업 후 상환과 일반 상환 비교',
  description: '학자금 대출을 취업 후 상환(ICL)으로 갚을 때와 일반 상환으로 갚을 때의 총 상환액·총 이자·상환 완료 연도를 나란히 비교합니다. 소득 증가율을 넣어 연도별 상환액과 잔액까지 봅니다.',
  alternates: { canonical: '/calculator/student-loan' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
