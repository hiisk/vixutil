import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '👏',
      eyebrow: 'Tap BPM',
      title: 'BPM 측정',
      desc: '박자에 맞춰 두드리면 템포를 알려줍니다',
      from: '#f59e0b',
      to: '#f43f5e',
    }),
    { ...size }
  );
}
