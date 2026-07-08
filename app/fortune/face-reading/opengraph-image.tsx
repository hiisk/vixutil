import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🪞',
      eyebrow: 'Face Reading',
      title: '관상 테스트',
      desc: '사진 한 장으로 보는 재미있는 관상 분석',
      from: '#0d9488',
      to: '#0369a1',
    }),
    { ...size }
  );
}
