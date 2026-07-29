import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔄',
      eyebrow: 'Unit Converter',
      title: '단위 변환',
      desc: '길이·무게·부피·넓이·온도까지 50가지 변환',
      from: '#3b82f6',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
