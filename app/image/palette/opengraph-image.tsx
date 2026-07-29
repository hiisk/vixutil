import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎨',
      eyebrow: 'Palette',
      title: '이미지 색상 추출',
      desc: '사진에서 많이 쓰인 색을 뽑아 HEX로 보여줍니다',
      from: '#ec4899',
      to: '#7c3aed',
    }),
    { ...size }
  );
}
