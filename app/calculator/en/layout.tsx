import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Korean Calculators', template: '%s | Korean Calculators' },
  description:
    'All-in-one Korean calculators for salary, tax, finance, real estate, and more — based on 2026 Korean standards',
  alternates: { canonical: '/calculator/en' },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
