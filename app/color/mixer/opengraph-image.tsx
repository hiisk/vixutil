import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧪',
      eyebrow: 'Mixer',
      title: '색 섞기',
      desc: '두 색 사이의 중간색을 만들기',
      from: '#14b8a6',
      to: '#0284c7',
    }),
    { ...size }
  );
}
