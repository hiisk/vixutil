import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '1RM 계산기 - 든 무게와 횟수로 1회 최대 중량 계산',
  description: '실제로 든 무게와 반복 횟수를 넣으면 에플리·브르지키·롬바르디 세 공식으로 1RM을 계산합니다. 50~100% 강도별 무게를 원판 규격인 2.5kg 단위로 떨어뜨려 바로 쓸 수 있게 보여줍니다.',
  alternates: {
    canonical: '/calculator/one-rep-max',
    languages: alternateLanguages10('/calculator/one-rep-max'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
