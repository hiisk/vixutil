import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🕰️',
      eyebrow: 'Time Zones',
      title: '시차 계산',
      desc: '해외 회의 시간을 서로의 시각으로',
      from: '#6366f1',
      to: '#7c3aed',
    }),
    { ...size }
  );
}
