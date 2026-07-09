import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🪙',
      eyebrow: 'Crypto Tools',
      title: '코인 트레이딩 도구',
      desc: '바이낸스 시세로 보는 변동성·TP/SL 계산',
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
