import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '근무시간 계산기 - 출퇴근 시각으로 실근무·휴게시간',
  description: '출근·퇴근 시각으로 하루 실근무시간을 계산합니다. 근로기준법상 최소 휴게시간(4시간 30분·8시간 1시간)과 8시간 초과 연장근로를 함께 보여 줍니다.',
  alternates: { canonical: '/calculator/work-hours' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
