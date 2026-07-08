import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '✍️',
      eyebrow: 'Handwriting',
      title: '손글씨 심리 테스트',
      desc: '손글씨 사진 한 장으로 보는 기울기·필압 분석',
      from: '#475569',
      to: '#4338ca',
    }),
    { ...size }
  );
}
