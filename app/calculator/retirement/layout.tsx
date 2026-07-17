import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '은퇴자금 계산기 - 노후 자산·월 인출 가능액 시뮬레이션',
  description: '현재 나이, 은퇴 목표 나이, 저축액, 월 저축액, 예상 수익률로 은퇴 시 자산과 월 인출 가능액(20/25/30년)을 계산합니다.',
  alternates: { canonical: '/calculator/retirement' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
