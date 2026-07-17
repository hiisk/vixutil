import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '팁 계산기 - 팁 금액 및 1인당 금액 계산',
  description: '음식값과 팁 비율, 인원수를 입력하면 팁 금액, 1인당 팁, 총액, 1인당 총액을 자동으로 계산합니다.',
  alternates: { canonical: '/calculator/tip' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
