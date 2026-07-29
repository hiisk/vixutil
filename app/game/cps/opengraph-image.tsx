import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🖱️',
      eyebrow: 'Click Speed',
      title: '클릭 속도 테스트',
      desc: '10초 동안 몇 번이나 클릭할 수 있나',
      from: '#0ea5e9',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
