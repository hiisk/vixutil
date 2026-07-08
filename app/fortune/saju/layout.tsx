import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '사주 분석 - 생년월일로 보는 사주팔자',
  description: '생년월일시로 사주 4주를 분석하고 오행 균형·십성·세운(연간 운세)까지 확인하는 무료 사주 서비스입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
