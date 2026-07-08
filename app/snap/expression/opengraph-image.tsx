import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎭',
      eyebrow: 'Expression',
      title: '표정 감정 분석',
      desc: 'AI로 보는 사진 속 표정의 7가지 감정',
      from: '#ec4899',
      to: '#7c3aed',
    }),
    { ...size }
  );
}
