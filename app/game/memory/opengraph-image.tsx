import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧠',
      eyebrow: 'Memory',
      title: '순서 기억 게임',
      desc: '색이 켜지는 순서를 따라 누르기',
      from: '#f59e0b',
      to: '#f43f5e',
    }),
    { ...size }
  );
}
