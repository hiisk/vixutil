import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧘',
      eyebrow: 'Binaural',
      title: '바이노럴 비트',
      desc: '좌우에 다른 주파수를 넣어 만드는 맥놀이',
      from: '#14b8a6',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
