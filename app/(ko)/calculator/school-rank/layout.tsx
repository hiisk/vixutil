import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '내신 등급 계산기 - 석차등급·평균 등급을 단위수로 계산',
  description: '석차와 수강자수로 석차등급을 내고, 과목별 등급을 이수단위 가중평균해 내신 평균 등급을 계산합니다. 9등급제와 5등급제, 동석차 처리, 소인원 과목에서 1등급이 나오지 않는 인원까지 함께 봅니다.',
  alternates: { canonical: '/calculator/school-rank' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
