import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🥩',
      eyebrow: 'Steak',
      title: '고기 굽기 온도',
      desc: '미디엄 레어는 중심 몇 도인가',
      from: '#ef4444',
      to: '#be123c',
    }),
    { ...size }
  );
}
