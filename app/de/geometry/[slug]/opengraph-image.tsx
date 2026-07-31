import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { GEO_SECTION } from '@/lib/geo-section';
import { geoTool, GEO_TOOLS } from '@/lib/geo-tools';
import { sectionCategories } from '@/lib/formula/section';
import { textOf } from '@/lib/formula/types';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return GEO_TOOLS.map(t => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) return new Response('Not found', { status: 404 });
  const text = textOf(tool, 'de');
  const label = sectionCategories(GEO_SECTION, 'de')[tool.category] ?? tool.category;

  return new ImageResponse(
    ogCard({
      icon: tool.icon,
      eyebrow: label,
      title: text.title,
      desc: text.desc,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    }),
    { ...size }
  );
}
