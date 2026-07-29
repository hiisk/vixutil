import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📆',
      eyebrow: 'Workdays',
      title: '근무일 계산',
      desc: '주말 빼고 며칠인지 세기',
      from: '#10b981',
      to: '#0d9488',
    }),
    { ...size }
  );
}
