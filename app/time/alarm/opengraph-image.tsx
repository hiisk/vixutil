import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '⏰',
      eyebrow: 'Alarm',
      title: '알람',
      desc: '정한 시각에 소리로 깨우기',
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
