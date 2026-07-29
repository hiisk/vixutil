import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '👂',
      eyebrow: 'Hearing',
      title: '가청 주파수 테스트',
      desc: '몇 Hz까지 들리는지 확인',
      from: '#06b6d4',
      to: '#2563eb',
    }),
    { ...size }
  );
}
