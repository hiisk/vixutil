import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔊',
      eyebrow: 'Speaker Test',
      title: '스피커·이어폰 테스트',
      desc: '좌우 채널 분리와 들리는 주파수 대역 확인',
      from: '#10b981',
      to: '#0d9488',
    }),
    { ...size }
  );
}
