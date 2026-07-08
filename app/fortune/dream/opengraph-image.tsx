import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🌙',
      eyebrow: 'Dream',
      title: '꿈 해몽',
      desc: '돼지·뱀·불 등 50가지 꿈의 의미 분석',
      from: '#334155',
      to: '#3730a3',
    }),
    { ...size }
  );
}
