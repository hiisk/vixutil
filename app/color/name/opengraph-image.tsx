import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🏷️',
      eyebrow: 'Color Name',
      title: '색 이름 찾기',
      desc: '이 색과 가장 가까운 이름은 무엇인가',
      from: '#84cc16',
      to: '#059669',
    }),
    { ...size }
  );
}
