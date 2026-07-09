import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📈',
      eyebrow: 'Crypto · Signals',
      title: 'ATR 타점 보드',
      desc: '현물·선물 코인 진입·TP·SL 3시간마다 자동 갱신',
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
