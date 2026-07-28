import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🐲',
      eyebrow: '띠 궁합',
      title: '띠 궁합',
      desc: '십이지로 보는 두 사람의 궁합',
      from: '#f43f5e',
      to: '#db2777',
    }),
    { ...size }
  );
}
