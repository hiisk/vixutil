import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
export const metadata: Metadata = {
  title: '할인 계산기 - 할인가·할인율·원가 역산',
  description: '할인가 계산, 할인율 계산, 원가 역산까지 세 가지 방식으로 할인 금액을 빠르게 계산합니다.',
  alternates: {
    canonical: '/calculator/discount',
    languages: alternateLanguages10('/calculator/discount'),
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
