import { ImageResponse } from 'next/og';
import { TESTS, TEST_MAP } from '@/lib/test-data';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return TESTS.map(t => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TEST_MAP[slug];
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
