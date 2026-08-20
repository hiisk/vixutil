import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '자녀 예상 키 계산기 - 부모 키로 보는 중간부모키와 예상 범위',
  description: '아버지·어머니 키와 자녀 성별을 넣으면 소아과에서 쓰는 중간부모키 공식으로 예상 성인 키를 계산합니다. 하나의 수가 아니라 68%·95%가 들어가는 두 범위로 보여줍니다.',
  alternates: {
    canonical: '/calculator/child-height',
    languages: alternateLanguages10('/calculator/child-height'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
