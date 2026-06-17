import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '물가상승률 계산기 - 인플레이션 미래 가치 계산',
  description: '현재 금액과 연 물가상승률, 기간을 입력하면 미래 필요 금액, 실질 구매력, 연도별 가치 변화를 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
