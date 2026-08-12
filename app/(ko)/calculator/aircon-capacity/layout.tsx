import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '에어컨 용량 계산기 - 몇 평에 몇 평형을 달아야 하나',
  description: '방 면적과 용도, 최상층·서향·통창 여부를 넣으면 필요한 냉방능력을 kW와 BTU/h로 내고 흔히 파는 용량 가운데 알맞은 등급과 평형 표기, 벽걸이·스탠드 여부를 골라 줍니다.',
  alternates: { canonical: '/calculator/aircon-capacity' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
