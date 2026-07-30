import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { IDIOMS, idiomBySlug } from '@/lib/hanja-tools';
import { HANJA_CATEGORY_LABEL, HANJA_SECTION, idiomHeading } from '@/lib/hanja-ui';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return IDIOMS.map(i => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    ogCard({
      icon: i.icon,
      eyebrow: HANJA_CATEGORY_LABEL['zh'][i.category] ?? '',
      title: `${i.hanja} ${idiomHeading(i, 'zh')}`,
      desc: i['zh'].meaning,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    }),
    { ...size }
  );
}
