import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🐾',
      eyebrow: 'Animal Face',
      title: '동물상 테스트',
      desc: '사진 한 장으로 보는 나의 동물상',
      from: '#f97316',
      to: '#db2777',
    }),
    { ...size }
  );
}
