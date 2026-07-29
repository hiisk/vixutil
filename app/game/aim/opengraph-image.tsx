import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎯',
      eyebrow: 'Aim',
      title: '표적 클릭 게임',
      desc: '30초 동안 과녁을 몇 개나 맞히나',
      from: '#f43f5e',
      to: '#f97316',
    }),
    { ...size }
  );
}
