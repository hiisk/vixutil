import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎂',
      eyebrow: 'Pan Size',
      title: '베이킹 팬 환산',
      desc: '틀 크기가 다를 때 반죽량 조절',
      from: '#ec4899',
      to: '#c026d3',
    }),
    { ...size }
  );
}
