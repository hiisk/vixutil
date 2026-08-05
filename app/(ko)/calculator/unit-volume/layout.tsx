import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '부피 단위 변환기 - mL·L·컵·홉·되·말·갤런 변환',
  description: 'mL, L, m³, 작은술, 큰술, 컵, 홉, 되, 말, 미국 액량온스·갤런, 영국 파인트를 한 번에 변환합니다.',
  alternates: { canonical: '/calculator/unit-volume' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
