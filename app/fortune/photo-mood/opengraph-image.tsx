import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎞️',
      eyebrow: 'Photo Mood',
      title: '사진 감성 분석',
      desc: '아무 사진이나 올려서 보는 내 감성 타입',
      from: '#d946ef',
      to: '#0ea5e9',
    }),
    { ...size }
  );
}
