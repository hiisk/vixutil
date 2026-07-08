import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧭',
      eyebrow: 'Personality Test',
      title: '심리 테스트',
      desc: 'MBTI · 연애 · 성향 · 밈 테스트 등 170개+',
      from: '#7c3aed',
      to: '#db2777',
    }),
    { ...size }
  );
}
