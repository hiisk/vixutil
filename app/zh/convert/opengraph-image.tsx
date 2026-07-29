import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔄',
      eyebrow: '单位换算',
      title: '单位换算',
      desc: '50种换算，含韩国传统单位',
      from: '#3b82f6',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
