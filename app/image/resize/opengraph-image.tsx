import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📐',
      eyebrow: 'Resize',
      title: '이미지 크기 조절',
      desc: '가로·세로 픽셀을 원하는 크기로 바꿉니다',
      from: '#0ea5e9',
      to: '#0891b2',
    }),
    { ...size }
  );
}
