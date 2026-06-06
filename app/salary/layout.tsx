import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '실수령액 계산기 - 연봉 입력으로 월 실수령액 즉시 계산',
  description: '2026년 4대보험 요율과 근로소득세법 기준으로 연봉에서 국민연금·건강보험·소득세를 공제한 월 실수령액을 계산합니다. 부양가족·식대 비과세 옵션도 지원합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
