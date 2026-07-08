import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '💑',
      eyebrow: 'Couple Match',
      title: '커플 관상 궁합',
      desc: '사진 두 장으로 보는 우리 커플 관상 궁합',
      from: '#f43f5e',
      to: '#db2777',
    }),
    { ...size }
  );
}
