import { ImageResponse } from 'next/og';
import { CONVERT_TOOLS, CONVERT_MAP } from '@/lib/convert-tools';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CONVERT_TOOLS.map(t => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = CONVERT_MAP[slug];
  if (!tool) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    ogCard({
      icon: tool.icon,
      eyebrow: `${tool.category} 변환`,
      title: tool.title,
      desc: tool.desc,
      from: '#3b82f6',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
