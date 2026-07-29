import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🍝',
      eyebrow: 'Pasta',
      title: '파스타 물·소금',
      desc: '면 200g에 물과 소금은 얼마나',
      from: '#eab308',
      to: '#d97706',
    }),
    { ...size }
  );
}
