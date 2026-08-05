import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '복리 계산기 - 원금·이율·기간으로 복리 최종금액 계산',
  description: '원금과 연이율, 투자 기간을 입력하면 복리 계산 결과와 연도별 잔액 추이를 즉시 확인할 수 있습니다. 단리 대비 수익 차이도 비교합니다.',
  alternates: { canonical: '/calculator/compound' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
