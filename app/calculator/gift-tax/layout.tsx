import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '증여세 계산기 - 관계별 공제한도 적용 증여세 계산',
  description: '증여재산가액과 수증자와의 관계(배우자·직계존비속·기타)에 따른 공제 후 증여세 과세표준과 납부세액을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
