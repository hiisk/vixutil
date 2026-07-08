import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🏆',
      eyebrow: 'Quiz',
      title: '지식 퀴즈',
      desc: '한국사 · IT · 상식 · K-POP 등 100개+ 퀴즈',
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
