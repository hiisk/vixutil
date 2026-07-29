import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { GENERATORS_ZH, GENERATORS_ZH_MAP } from '@/lib/generator-zh';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return GENERATORS_ZH.map(x => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATORS_ZH_MAP[slug];
  if (!gen) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    ogCard({
      icon: gen.icon,
      eyebrow: `${gen.category} GENERATOR`,
      title: gen.title,
      desc: gen.desc,
      from: '#10b981',
      to: '#0d9488',
    }),
    { ...size }
  );
}
