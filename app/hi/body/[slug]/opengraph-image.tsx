import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { BODY_SECTION } from '@/lib/body-section';
import { bodyTool, BODY_TOOLS } from '@/lib/body-tools';
import { sectionCategories } from '@/lib/formula/section';
import { textOf } from '@/lib/formula/types';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return BODY_TOOLS.map(t => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) return new Response('Not found', { status: 404 });
  const text = textOf(tool, 'hi');
  const label = sectionCategories(BODY_SECTION, 'hi')[tool.category] ?? tool.category;

  return new ImageResponse(
    ogCard({
      icon: tool.icon,
      eyebrow: label,
      title: text.title,
      desc: text.desc,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    }),
    { ...size }
  );
}
