import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '사업소득세 계산기 - 업종별 기준경비율·단순경비율 적용',
  description: '사업소득 신고 시 업종별 기준경비율 또는 단순경비율을 적용한 소득금액과 종합소득세를 계산합니다.',
  alternates: { canonical: '/calculator/business-income' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
