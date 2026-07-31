import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { COUNTRIES, countryBySlug } from '@/lib/country-tools';
import { COUNTRY_UI, countryRegions, COUNTRY_SECTION, utcLabel } from '@/lib/country-ui';
import { countryText } from '@/lib/country/types';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) return new Response('Not found', { status: 404 });
  const t = countryText(c, 'pt-br');
  const ui = COUNTRY_UI['pt-br'];

  return new ImageResponse(
    ogCard({
      icon: '🧭',
      eyebrow: countryRegions('pt-br')[c.region] ?? ui.section,
      title: t.name,
      desc: `${utcLabel(c.utc)} · ${c.volt} ${c.hz} · ${c.dial}`,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    }),
    { ...size }
  );
}
