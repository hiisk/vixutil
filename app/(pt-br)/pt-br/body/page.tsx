import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { BODY_SECTION, BODY_LANGS } from '@/lib/body-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { sectionMeta } from '@/lib/formula/section';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/* 화면은 components/FormulaHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const meta = sectionMeta(BODY_SECTION, 'pt-br');

export const metadata: Metadata = withCard({
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('pt-br'),
  alternates: {
    canonical: localeHref('pt-br', '/body'),
    languages: sectionAlternates('body', undefined, BODY_LANGS),
  },
});

export default function BodyHubPtBr() {
  return <FormulaHub lang="pt-br" section={BODY_SECTION} />;
}
