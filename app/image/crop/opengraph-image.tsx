import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '✂️',
      eyebrow: 'Crop',
      title: '이미지 자르기',
      desc: '필요한 부분만 잘라냅니다',
      from: '#f43f5e',
      to: '#f97316',
    }),
    { ...size }
  );
}
