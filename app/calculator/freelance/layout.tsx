import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '프리랜서 세금 계산기 - 3.3% 원천징수 및 종합소득세 계산',
  description: '프리랜서·사업소득 3.3% 원천징수 공제액과 연간 소득에 따른 종합소득세 환급 예상액을 계산합니다. 필요경비 공제 옵션도 지원합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
