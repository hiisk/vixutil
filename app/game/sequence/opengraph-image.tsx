import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔲',
      eyebrow: 'Pattern',
      title: '패턴 기억 게임',
      desc: '격자에 켜진 칸의 위치를 기억하기',
      from: '#475569',
      to: '#4338ca',
    }),
    { ...size }
  );
}
