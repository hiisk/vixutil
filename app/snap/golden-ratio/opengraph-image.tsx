import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📐',
      eyebrow: 'Golden Ratio',
      title: '얼굴 황금비율 테스트',
      desc: '사진 한 장으로 보는 이목구비 황금비 점수',
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
