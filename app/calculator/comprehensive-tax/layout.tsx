import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '종합소득세 계산기 - 2026년 세율 기준 소득세 계산',
  description: '2026년 종합소득세 6단계 누진세율(6%~45%)로 종합소득 과세표준에 따른 소득세와 지방소득세를 계산합니다. 기본공제·인적공제 입력 지원.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
