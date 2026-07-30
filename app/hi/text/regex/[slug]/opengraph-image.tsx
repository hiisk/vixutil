import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';
import { patternCard, patternParams } from '@/lib/regex/route';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return patternParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return new ImageResponse(patternCard('hi', slug), { ...size });
}
