/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import type { Metadata } from 'next';
import { COUNTRIES, countryBySlug } from '@/lib/country-tools';
import { COUNTRY_UI, countryAlternates, gapText } from '@/lib/country-ui';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';
export function generateStaticParams() {
  return prerender(COUNTRIES.map(c => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) return {};
  const t = c['ko'];
  const ui = COUNTRY_UI['ko'];
  return withCard({
    title: `${t.name} — ${ui.section}`,
    description: `${t.name}: ${gapText(c, 'ko')}, ${ui.volt} ${c.volt}, ${ui.plug} ${c.plug}, ${ui.dial} ${c.dial}. ${t.intro}`,
    alternates: { canonical: '/country/' + slug, languages: countryAlternates(slug) },
  });
}
