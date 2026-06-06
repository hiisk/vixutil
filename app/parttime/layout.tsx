import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '알바 급여 계산기 - 시급·근무시간 기준 주급·월급 계산',
  description: '시급과 일 근무시간, 주 근무일수를 입력하면 일급·주급·월급을 계산합니다. 주 15시간 이상 근무 시 주휴수당을 자동으로 포함합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
