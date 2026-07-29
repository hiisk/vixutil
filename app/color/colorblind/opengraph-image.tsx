import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '👓',
      eyebrow: 'CVD Sim',
      title: '색맹 시뮬레이터',
      desc: '색각 이상이 있는 눈에 어떻게 보이는지',
      from: '#f59e0b',
      to: '#f43f5e',
    }),
    { ...size }
  );
}
