import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '💕',
      eyebrow: '이름 궁합',
      title: '이름 궁합',
      desc: '두 사람 이름 획수로 보는 궁합',
      from: '#ec4899',
      to: '#e11d48',
    }),
    { ...size }
  );
}
