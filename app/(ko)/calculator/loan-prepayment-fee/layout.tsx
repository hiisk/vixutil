import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '중도상환수수료 계산기 - 대출 조기상환 수수료 계산',
  description: '중도상환원금·수수료율·대출기간·경과기간을 입력하면 대출 조기상환 시 발생하는 중도상환수수료를 계산합니다.',
  alternates: { canonical: '/calculator/loan-prepayment-fee' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
