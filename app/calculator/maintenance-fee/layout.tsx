import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '관리비 계산기 - 아파트 관리비 항목별 비중과 ㎡당 단가 분석',
  description: '아파트 관리비 고지서를 항목별로 넣으면 공용관리비와 개별사용료를 나눠 비중을 보여주고, 전용면적 기준 ㎡당·평당 단가를 계산합니다. 평수가 다른 집과 비교할 때 쓰세요.',
  alternates: { canonical: '/calculator/maintenance-fee' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
