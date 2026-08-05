import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { RATE_SECTION } from '@/lib/rate-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { sectionMeta } from '@/lib/formula/section';
import { localeHref, openGraphFor } from '@/lib/locales';
import { RATE_LANGS } from '@/lib/rate-section';

/* 화면은 components/FormulaHub.tsx 하나를 열 언어가 같이 쓴다 */
const meta = sectionMeta(RATE_SECTION, 'zh-hant');

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('zh-hant'),
  alternates: {
    canonical: localeHref('zh-hant', '/rate'),
    languages: sectionAlternates('rate', undefined, RATE_LANGS),
  },
};

export default function RateHubZhHant() {
  return <FormulaHub lang="zh-hant" section={RATE_SECTION} />;
}
