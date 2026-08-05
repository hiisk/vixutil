import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: { default: 'Korean Calculators', template: '%s | Korean Calculators' },
  description:
    'All-in-one Korean calculators for salary, tax, finance, real estate, and more — based on 2026 Korean standards',
  alternates: {
    canonical: '/calculator/en',
    // ko는 뺐다. /calculator는 자기 영어판으로 /en/calculator를 지목하므로
    // 여기서 /calculator를 가리키면 돌아오지 않는 한쪽 선언이 되고, 구글은 그걸 무시한다.
    languages: { 'en': '/calculator/en', 'ja': '/calculator/ja', 'x-default': '/calculator/en' },
  },
});

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
