import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '육아휴직 급여 계산기 - 월별 지급액·총 수령액 계산',
  description: '통상임금을 넣으면 육아휴직 급여의 월 지급액과 휴직 기간 총 수령액을 계산합니다. 상·하한액과 사후지급금을 반영한 예상액입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
