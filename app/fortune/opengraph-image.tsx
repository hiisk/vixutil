import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔮',
      eyebrow: 'Fortune',
      title: '오늘의 무료 운세',
      desc: '사주 · 타로 · 별자리 · 띠 · 꿈해몽 · MBTI 운세',
      from: '#7c3aed',
      to: '#db2777',
    }),
    { ...size }
  );
}
