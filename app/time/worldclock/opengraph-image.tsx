import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🌍',
      eyebrow: 'World Clock',
      title: '세계 시계',
      desc: '주요 도시의 지금 시각을 한눈에',
      from: '#06b6d4',
      to: '#2563eb',
    }),
    { ...size }
  );
}
