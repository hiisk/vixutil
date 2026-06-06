import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '대출 이자 계산기 - 원리금균등·원금균등 상환 월 납입금',
  description: '대출금액, 금리, 기간을 입력하면 원리금균등상환과 원금균등상환 방식의 월 납입금과 총 이자를 비교 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
