import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📊',
      eyebrow: 'Calculator',
      title: '실생활 계산기',
      desc: '세금 · 금융 · 대출 · 부동산 · 건강 등 85개+ 계산기',
      from: '#1d4ed8',
      to: '#3b82f6',
    }),
    { ...size }
  );
}
