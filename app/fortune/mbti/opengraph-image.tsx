import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧠',
      eyebrow: 'MBTI',
      title: 'MBTI 운세',
      desc: '16가지 성격 유형별 오늘의 운세',
      from: '#0ea5e9',
      to: '#2563eb',
    }),
    { ...size }
  );
}
