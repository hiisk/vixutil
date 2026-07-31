import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { IDIOMS, idiomBySlug } from '@/lib/hanja-tools';
import { HANJA_UI, hanjaCategories, HANJA_SECTION, idiomHeading } from '@/lib/hanja-ui';
import { idiomText } from '@/lib/hanja/types';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return IDIOMS.map(i => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) return new Response('Not found', { status: 404 });
  const t = idiomText(i, 'es');
  const ui = HANJA_UI['es'];

  return new ImageResponse(
    ogCard({
      icon: '📖',
      eyebrow: hanjaCategories('es')[i.category] ?? ui.section,
      title: i.hanja,
      desc: `${idiomHeading(i, 'es')} · ${t.meaning}`,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    }),
    { ...size }
  );
}
