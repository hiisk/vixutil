import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { GEO_SECTION, GEO_LANGS } from '@/lib/geo-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { sectionMeta } from '@/lib/formula/section';
import { localeHref, openGraphFor } from '@/lib/locales';

/* 화면은 components/FormulaHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const meta = sectionMeta(GEO_SECTION, 'es');

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('es'),
  alternates: {
    canonical: localeHref('es', '/geometry'),
    languages: sectionAlternates('geometry', undefined, GEO_LANGS),
  },
};

export default function GeoHubEs() {
  return <FormulaHub lang="es" section={GEO_SECTION} />;
}
