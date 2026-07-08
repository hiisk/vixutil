import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '⚖️',
      eyebrow: 'Face Symmetry',
      title: '얼굴 대칭 분석',
      desc: '사진 한 장으로 보는 좌우 밸런스 지수',
      from: '#6366f1',
      to: '#06b6d4',
    }),
    { ...size }
  );
}
