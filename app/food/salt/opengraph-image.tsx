import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧂',
      eyebrow: 'Brine',
      title: '소금물 염도',
      desc: '김장·장아찌용 소금물 만들기',
      from: '#0ea5e9',
      to: '#0891b2',
    }),
    { ...size }
  );
}
