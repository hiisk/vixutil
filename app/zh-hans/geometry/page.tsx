import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { GEO_SECTION, GEO_LANGS } from '@/lib/geo-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { sectionMeta } from '@/lib/formula/section';
import { localeHref, openGraphFor } from '@/lib/locales';

/* 화면은 components/FormulaHub.tsx 하나를 열 언어가 같이 쓴다 */
const meta = sectionMeta(GEO_SECTION, 'zh-hans');

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('zh-hans'),
  alternates: {
    canonical: localeHref('zh-hans', '/geometry'),
    languages: sectionAlternates('geometry', undefined, GEO_LANGS),
  },
};

export default function GeoHubZhHans() {
  return <FormulaHub lang="zh-hans" section={GEO_SECTION} />;
}
