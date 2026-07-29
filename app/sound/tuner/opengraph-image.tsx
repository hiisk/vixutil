import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎸',
      eyebrow: 'Tuner',
      title: '악기 튜너',
      desc: '마이크로 소리를 듣고 음정을 알려줍니다',
      from: '#10b981',
      to: '#0d9488',
    }),
    { ...size }
  );
}
