import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '세뱃돈 계산기 - 나이·관계별 금액대와 여러 아이 합계',
  description: '미취학부터 대학생까지 나이와 관계로 세뱃돈 금액대를 좁히고, 여러 아이에게 줄 합계를 한 번에 냅니다. 형제간 균형과 받은 금액에 맞추는 문제, 지폐로 떨어지는 단위까지 함께 봅니다.',
  alternates: { canonical: '/calculator/new-year-money' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
