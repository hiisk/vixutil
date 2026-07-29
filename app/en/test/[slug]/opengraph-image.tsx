import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { TESTS_EN, TESTS_EN_MAP } from '@/lib/test-en';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return TESTS_EN.map(x => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TESTS_EN_MAP[slug];
  if (!test) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    ogCard({
      icon: test.icon,
      eyebrow: `${test.category} TEST`,
      title: test.title,
      desc: test.desc,
      from: '#7c3aed',
      to: '#db2777',
    }),
    { ...size }
  );
}
