import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🌈',
      eyebrow: 'Gradient',
      title: '그라디언트 만들기',
      desc: '두세 색으로 CSS 그라디언트 생성',
      from: '#d946ef',
      to: '#0ea5e9',
    }),
    { ...size }
  );
}
