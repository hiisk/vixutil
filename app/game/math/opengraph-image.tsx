import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '➕',
      eyebrow: 'Mental Math',
      title: '암산 대결',
      desc: '30초 동안 몇 문제나 푸나',
      from: '#10b981',
      to: '#65a30d',
    }),
    { ...size }
  );
}
