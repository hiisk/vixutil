import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '주택임대소득세 계산기 - 2천만원 이하 분리과세',
  description: '연 임대수입과 등록 여부를 넣으면 필요경비·기본공제를 반영해 14% 분리과세 세액과 지방소득세를 계산합니다. 등록임대사업자와 미등록의 세금 차이도 확인할 수 있습니다.',
  alternates: { canonical: '/calculator/rental-income-tax' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
