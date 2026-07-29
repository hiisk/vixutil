import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧼',
      eyebrow: 'Clean Up',
      title: '텍스트 정리',
      desc: '복사해 온 글의 이상한 공백·줄바꿈 정리',
      from: '#0ea5e9',
      to: '#0891b2',
    }),
    { ...size }
  );
}
