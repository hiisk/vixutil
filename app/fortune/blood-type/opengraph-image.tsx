import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🩸',
      eyebrow: '혈액형',
      title: '혈액형 운세',
      desc: 'A·B·O·AB형 오늘의 운세',
      from: '#f43f5e',
      to: '#dc2626',
    }),
    { ...size }
  );
}
