import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔥',
      eyebrow: 'Kelvin',
      title: '색온도 변환',
      desc: '켈빈(K) 값을 실제 색으로 보기',
      from: '#f97316',
      to: '#0891b2',
    }),
    { ...size }
  );
}
