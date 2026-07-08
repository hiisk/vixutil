import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🃏',
      eyebrow: 'Tarot',
      title: '타로 카드',
      desc: '78장 풀덱에서 카드 뽑기',
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
