import { ImageResponse } from 'next/og';
import { CONVERT_TOOLS, CONVERT_MAP } from '@/lib/convert-tools';
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';
import { convertOg } from '@/lib/og-intl';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CONVERT_TOOLS.map(t => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CONVERT_MAP[slug]) return new Response('Not found', { status: 404 });
  return new ImageResponse(convertOg(slug, 'es'), { ...size });
}
