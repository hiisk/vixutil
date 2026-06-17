import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '상속세 계산기 - 상속재산 공제 후 상속세 계산',
  description: '상속재산총액에서 기초공제·배우자공제·인적공제를 차감한 과세표준으로 상속세를 계산합니다. 10%~50% 누진세율 자동 적용.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
