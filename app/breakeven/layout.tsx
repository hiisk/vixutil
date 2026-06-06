import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '손익분기점 계산기 - 고정비·변동비 기준 BEP 매출 계산',
  description: '고정비용과 단위당 변동비, 판매가격을 입력하면 손익분기점(BEP) 판매량과 BEP 매출액을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
