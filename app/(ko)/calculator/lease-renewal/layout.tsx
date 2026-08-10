import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '계약갱신 인상 한도 계산기 - 전세·월세 5% 상한 계산',
  description: '계약갱신청구권을 쓸 때 올릴 수 있는 보증금과 월세 상한(5%)을 계산합니다. 보증금 증액분을 월세로 돌릴 때의 월 부담도 전월세전환율로 함께 봅니다.',
  alternates: { canonical: '/calculator/lease-renewal' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
