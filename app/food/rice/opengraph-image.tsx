import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🍚',
      eyebrow: 'Rice',
      title: '밥물 계산',
      desc: '쌀 몇 컵에 물은 얼마나',
      from: '#84cc16',
      to: '#059669',
    }),
    { ...size }
  );
}
