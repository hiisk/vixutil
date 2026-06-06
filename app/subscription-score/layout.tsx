import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '청약 가점 계산기 - 무주택기간·부양가족·통장 가입기간',
  description: '무주택 기간(최대 32점), 부양가족 수(최대 35점), 청약통장 가입 기간(최대 17점)으로 청약 가점을 계산합니다. 총 84점 만점 기준.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
