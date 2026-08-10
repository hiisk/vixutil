import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '반려동물 나이 계산기 - 강아지·고양이 사람 나이 환산',
  description: '강아지와 고양이의 나이를 사람 나이로 환산합니다. 7을 곱하는 방식 대신 첫해 15살·둘째 해 9살을 더하는 방식과 소형견·중형견·대형견 구분을 함께 안내합니다.',
  alternates: {
    canonical: '/calculator/pet-age',
    languages: alternateLanguages10('/calculator/pet-age'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
