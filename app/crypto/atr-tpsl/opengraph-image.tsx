import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📊',
      eyebrow: 'Crypto · ATR',
      title: 'ATR TP/SL 세팅',
      desc: '바이낸스 코인 변동성 기반 익절·손절 계산기',
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
