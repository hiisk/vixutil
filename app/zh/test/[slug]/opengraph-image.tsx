import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { TESTS_ZH, TESTS_ZH_MAP } from '@/lib/test-zh';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return TESTS_ZH.map(x => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TESTS_ZH_MAP[slug];
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
