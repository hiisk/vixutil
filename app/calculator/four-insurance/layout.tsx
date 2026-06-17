import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '4대보험 계산기 - 국민연금·건강보험·고용보험·장기요양 공제액',
  description: '2026년 4대보험 요율 기준으로 월급에서 국민연금(4.5%), 건강보험(3.545%), 장기요양보험, 고용보험(0.9%)을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
