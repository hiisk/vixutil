import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';
import { lensCard, lensParams } from '@/lib/lens/route';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return lensParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return new ImageResponse(lensCard('de', slug), { ...size });
}
