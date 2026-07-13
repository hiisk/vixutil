import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '연금저축·IRP 세액공제 계산기 - 연말정산 환급액 즉시 계산',
  description: '연금저축·IRP 납입액을 넣으면 연말정산 세액공제액을 계산합니다. 총급여에 따른 공제율(16.5%/13.2%)과 한도(연금저축 600만원·합산 900만원)를 반영하고, 남은 납입 여력까지 알려줍니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
