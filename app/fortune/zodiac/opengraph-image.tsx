import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '⭐',
      eyebrow: 'Zodiac',
      title: '별자리 운세',
      desc: '12개 별자리로 오늘의 운세 확인',
      from: '#8b5cf6',
      to: '#7e22ce',
    }),
    { ...size }
  );
}
