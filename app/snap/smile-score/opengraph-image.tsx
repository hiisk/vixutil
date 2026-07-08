import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '😊',
      eyebrow: 'Smile Score',
      title: '미소 지수 측정',
      desc: '사진 한 장으로 보는 내 미소 지수',
      from: '#fbbf24',
      to: '#f43f5e',
    }),
    { ...size }
  );
}
