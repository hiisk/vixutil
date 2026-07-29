import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🍅',
      eyebrow: 'Pomodoro',
      title: '뽀모도로 타이머',
      desc: '25분 집중 · 5분 휴식 반복',
      from: '#ef4444',
      to: '#e11d48',
    }),
    { ...size }
  );
}
