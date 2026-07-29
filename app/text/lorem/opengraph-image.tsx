import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📄',
      eyebrow: 'Lorem',
      title: '더미 텍스트 생성',
      desc: '레이아웃 채울 한글·영문 예시 문장',
      from: '#64748b',
      to: '#0284c7',
    }),
    { ...size }
  );
}
