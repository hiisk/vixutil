import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📈',
      eyebrow: '바이오리듬',
      title: '바이오리듬 계산기',
      desc: '신체·감성·지성 리듬 그래프',
      from: '#10b981',
      to: '#0d9488',
    }),
    { ...size }
  );
}
