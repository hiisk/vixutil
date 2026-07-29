import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '⚡',
      eyebrow: 'Reaction',
      title: '반응속도 테스트',
      desc: '초록불이 켜지면 얼마나 빨리 누르나',
      from: '#10b981',
      to: '#0d9488',
    }),
    { ...size }
  );
}
