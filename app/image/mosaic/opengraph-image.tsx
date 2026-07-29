import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔳',
      eyebrow: 'Mosaic',
      title: '모자이크 가리기',
      desc: '얼굴·주소 등 가리고 싶은 곳을 문질러 지웁니다',
      from: '#475569',
      to: '#6d28d9',
    }),
    { ...size }
  );
}
