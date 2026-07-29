import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { RATE_SECTION } from '@/lib/rate-section';
import { rateTool, RATE_TOOLS } from '@/lib/rate-tools';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return RATE_TOOLS.map(t => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) return new Response('Not found', { status: 404 });
  const text = tool['en'];
  const label = RATE_SECTION.categoryLabel['en'][tool.category] ?? tool.category;

  return new ImageResponse(
    ogCard({
      icon: tool.icon,
      eyebrow: label,
      title: text.title,
      desc: text.desc,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    }),
    { ...size }
  );
}
