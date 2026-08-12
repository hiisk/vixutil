import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '국민연금 추납·임의가입 계산기 - 넣은 돈 몇 년에 본전',
  description: '추납이나 임의가입으로 가입기간을 채우면 월 연금이 얼마 늘고, 낸 보험료를 몇 년에 회수하는지 계산합니다. 가입 10년(120개월)을 갓 넘길 때 이득이 가장 큰 이유도 함께 봅니다.',
  alternates: { canonical: '/calculator/pension-catchup' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
