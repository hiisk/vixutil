import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: 'BMI 계산기 - 신장·체중으로 체질량지수 및 비만도 계산',
  description: '신장(cm)과 체중(kg)을 입력하면 BMI(체질량지수)와 WHO 기준 비만도(저체중·정상·과체중·비만)를 계산합니다.',
  alternates: {
    canonical: '/calculator/bmi',
    languages: alternateLanguages10('/calculator/bmi'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
