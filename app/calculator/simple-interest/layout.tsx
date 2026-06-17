import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '단리 계산기 - 이자·세후이자·만기금액 계산',
  description: '원금, 연이율, 기간을 입력하면 단리 이자, 세후이자(15.4% 세율), 만기금액과 연도별 이자 테이블을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
