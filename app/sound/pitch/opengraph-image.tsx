import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '👂',
      eyebrow: 'Ear Training',
      title: '음정 듣기 훈련',
      desc: '들려주는 두 음의 관계 맞히기',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
    { ...size }
  );
}
