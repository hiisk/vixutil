import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '간이과세 부가세 계산기 - 간이과세자 부가가치세',
  description: '간이과세자의 연 매출과 업종별 부가가치율로 예상 부가가치세 납부액을 계산합니다. 연 매출 4,800만원 미만 납부 면제, 8,000만원 이상 일반과세 전환 기준도 함께 확인합니다.',
  alternates: { canonical: '/calculator/simple-vat' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
