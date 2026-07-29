import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🖥️',
      eyebrow: 'Monitor Test',
      title: '모니터 불량화소 테스트',
      desc: '단색 전체화면으로 죽은 픽셀·얼룩 찾기',
      from: '#475569',
      to: '#4338ca',
    }),
    { ...size }
  );
}
