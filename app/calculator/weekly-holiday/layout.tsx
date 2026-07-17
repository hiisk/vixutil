import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '주휴수당 계산기 - 시급·주 근무시간으로 주휴수당 계산',
  description: '시급과 주 소정근로시간을 입력하면 주휴수당과 월급을 자동으로 계산합니다. 주 15시간 이상 근무 시 주휴수당 발생 기준을 적용합니다.',
  alternates: { canonical: '/calculator/weekly-holiday' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
