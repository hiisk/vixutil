import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔄',
      eyebrow: 'Unit Converter',
      title: 'Unit Converter',
      desc: '50 converters incl. Korean pyeong, geun, don',
      from: '#3b82f6',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
