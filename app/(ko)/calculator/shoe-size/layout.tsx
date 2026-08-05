import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '신발 사이즈 변환기 - 발 길이 mm를 EU·UK·US로',
  description: '발 길이(mm)를 EU·UK·US 신발 치수로 변환합니다. 발 재는 법과 운동화에 두는 5~10mm 여유까지 함께 계산합니다.',
  alternates: { canonical: '/calculator/shoe-size' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
