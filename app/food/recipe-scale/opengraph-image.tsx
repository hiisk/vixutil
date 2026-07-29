import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📖',
      eyebrow: 'Scale',
      title: '레시피 배율',
      desc: '2인분 레시피를 원하는 인분으로',
      from: '#f43f5e',
      to: '#db2777',
    }),
    { ...size }
  );
}
