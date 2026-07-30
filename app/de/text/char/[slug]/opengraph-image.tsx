import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';
import { glyphCard, glyphParams } from '@/lib/glyph/route';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return glyphParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return new ImageResponse(glyphCard('de', slug), { ...size });
}
