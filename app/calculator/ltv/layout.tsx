import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'LTV 계산기 - 담보인정비율 및 대출 한도 계산',
  description: '부동산 감정가와 기존 대출금을 입력하면 LTV(담보인정비율)를 계산하고, 지역·주택 유형별 LTV 한도 내 추가 대출 가능액을 산출합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
