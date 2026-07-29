import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎂',
      eyebrow: 'Lived Time',
      title: '살아온 시간',
      desc: '태어나서 지금까지 몇 초인지',
      from: '#ec4899',
      to: '#e11d48',
    }),
    { ...size }
  );
}
