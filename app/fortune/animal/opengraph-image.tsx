import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🐉',
      eyebrow: 'Animal Sign',
      title: '띠 운세',
      desc: '쥐·소·범 등 12띠별 오늘의 운세',
      from: '#f43f5e',
      to: '#db2777',
    }),
    { ...size }
  );
}
